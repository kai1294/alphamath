import { Nodes } from "..";
import { match } from "../../utils";
import { isContainer } from "../meta";

const primeFactors = (n) => {
    const factors = [];
    let divisor = 2;
    
    while (n >= 2) {
        if (n % divisor == 0) {
          factors.push(divisor);
          n = n / divisor;
        } else {
          divisor++;
        }
    }
    
    return factors;
};

const apply = (node) => {
    let primes = primeFactors(node.data+0);

    return Nodes.Multiplication(primes.map(p => Nodes.Number(p)));
};

export default {
    name: "Rewrite as prime factors",
    id: "as_prime_factors",
    filter: (n) => n.type == "Number",
    apply,
};
