import { globSync, readFileSync, writeFileSync } from "node:fs"
import { join, relative, resolve } from "node:path"

const tsconfig = JSON.parse(readFileSync("./tsconfig.json").toString());

let remap: Record<string, string> = {};

for(let [path, resolvers] of Object.entries((tsconfig?.compilerOptions?.paths || {}) as Record<string, string[]>)) {
    if(resolvers.length > 1) console.log("Warn: This script will only work with the first path in aliases!");

    if(!path.endsWith("/*")) {
        console.log(`Skipping tsconfig path alias: ${path}`);
        continue;
    };

    const aliasBase = resolvers[0].replace("*", "");

    console.log({ aliasBase })

    remap[path.slice(0, path.length-1)] = resolve(aliasBase);
}

console.log({ remap })

const transformModuleIdentifier = (
    importerModulePath: string,
    importedModuleId: string
): string => {
    for(let [prefix, base] of Object.entries(remap)) {
        if(!importedModuleId.startsWith(prefix)) continue;
        const importedPathRelativeToBase = importedModuleId.slice(prefix.length);
        const importedAbsolute = join(base, importedPathRelativeToBase);
        const importerAbsolute = resolve(importerModulePath);
        const rel =  relative(importerAbsolute, importedAbsolute).slice(3);
        // console.log({
        //     prefix,
        //     base,
        //     importedPathRelativeToBase,
        //     importedAbsolute,
        //     importerModulePath,
        //     importerAbsolute,
        //     rel,
        // });
        return rel;
    }

    return importedModuleId;
};

for(let entry of globSync([
    "**/*.js",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx",
], {
    exclude: (filename) => ["node_modules", "dist"].includes(filename),
})) {
    console.log(entry);

    const originalContent = readFileSync(entry).toString();

    // https://stackoverflow.com/a/73265022
    const importRegex = /import(?:(?:(?:[ \n\t]+([^ *\n\t\{\},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t\{\}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g;

    const newContent = originalContent.replace(importRegex, (
        substring,
        defaultImport: string,
        destructuredExports: string,
        wildcardImportName: string,
        moduleIdentifier: string,
        quotes: string, 
    ) => {
        let newModuleIdentifier = transformModuleIdentifier(entry, moduleIdentifier);

        const statement = [
            "import",
            (defaultImport ? " " : ""),
            defaultImport,
            (!!defaultImport && !!destructuredExports && "," || ""),
            destructuredExports,
            (wildcardImportName ? (`* as ${wildcardImportName}`) : ""),
            " from ",
            quotes,
            newModuleIdentifier,
            quotes,
        ].join("");

        if(substring != statement) {
            console.log(` -- ${substring}`);
            console.log(` ++ ${statement}`);
        };

        return statement;
    });

    if(process.argv.includes("WRITE")) {
        writeFileSync(entry, newContent);
    }
}
