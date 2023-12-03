import distribute_mul from "./distribute_mul";
import evaluate_literals from "./evaluate_literals";
import flatten from "./flatten";
import flatten_recursive from "./flatten_recursive";
import rewrite_as_prime_factors from "./rewrite_as_prime_factors";

export default [
    flatten,
    flatten_recursive,
    evaluate_literals,
    rewrite_as_prime_factors,
    distribute_mul,
];
