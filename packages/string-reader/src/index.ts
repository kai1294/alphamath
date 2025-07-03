export class StringReader {
    value: string;
    cursor: number = 0;

    constructor(value: string, cursor?: number) {
        this.value = value;
        if (cursor) this.cursor = cursor;
    }

    isEOF() {
        return this.cursor >= this.value.length;
    }

    readChar() {
        return this.value[++this.cursor] || "";
    }

    skipChar() {
        this.cursor++;
    }

    peek(count = 1, offset = 0) {
        return this.value.substring(this.cursor + offset, this.cursor + offset + count);
    }

    readUntilChar(char: string | string[]) {
        const chars = Array.isArray(char) ? char : [char];
        let buf = "";
        while(!this.isEOF()) {
            let peeked = this.peek();
            if(char == peeked) break;
            buf += peeked;
            this.skipChar();
        }
        return buf;
    }
}
