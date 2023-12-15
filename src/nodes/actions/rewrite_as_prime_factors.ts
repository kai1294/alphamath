import { Nodes } from "..";
import { isPrime, primeFactors } from "../../utils";

const apply = (node) => {
	let primes = primeFactors(node.data + 0).map(p => Nodes.Number(p));

	return primes.length == 1 ? primes[0] : Nodes.Multiplication(primes);
};

export default {
	name: "Rewrite as prime factors",
	id: "as_prime_factors",
	filter: (n) => n.type == "Number"
		&& n.data > 3
		&& !isPrime(n.data),
	apply,
};
