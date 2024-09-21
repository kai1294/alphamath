import { argument, CommandContext, CommandDispatcher, greedyString, literal, StringArgumentType } from "brigadier-ts";
import { ExecutionContext } from "./ExecutionContext";

export const dispatcher = new CommandDispatcher<ExecutionContext>();

dispatcher.register(literal("random").executes(c => Math.random()));
dispatcher.register(literal("create")
    .then(literal("note")
        .then(argument("content", greedyString())
            .executes(c => console.log(c))))
    .then(literal("rpn").then(argument("rpn", greedyString()))));
