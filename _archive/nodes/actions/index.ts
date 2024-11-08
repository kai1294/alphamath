import de_negate from "./store/de_negate";
import distribute_mul from "./store/distribute_mul";
import evaluate_literals from "./store/evaluate_literals";
import flatten from "./store/flatten";
import hidden_coefficient from "./store/hidden_coefficient";
import move_negate_front from "./store/move_negate_front";
import remove_coefficient from "./store/remove_coefficient";
import rewrite_as_prime_factors from "./store/rewrite_as_prime_factors";
import { Action } from "./types";

export default [
    evaluate_literals,
    flatten,
    rewrite_as_prime_factors,
    distribute_mul,
    hidden_coefficient,
    remove_coefficient,
    de_negate,
    move_negate_front,
] as Action[];
