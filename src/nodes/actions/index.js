import de_negate from "./de_negate";
import distribute_mul from "./distribute_mul";
import evaluate_literals from "./evaluate_literals";
import flatten from "./flatten";
import hidden_coefficient from "./hidden_coefficient";
import move_negate_front from "./move_negate_front";
import remove_coefficient from "./remove_coefficient";
import rewrite_as_prime_factors from "./rewrite_as_prime_factors";

export default [
    evaluate_literals,
    flatten,
    rewrite_as_prime_factors,
    distribute_mul,
    hidden_coefficient,
    remove_coefficient,
    de_negate,
    move_negate_front,
];
