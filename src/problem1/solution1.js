// brute-force
var sum_to_n_a = function(n) {
    if (n <= 1) return n
    let sum = 0 
    for (let i = 1; i <= n; i++) {
        sum += i
    }
    return sum
};

// equation: preferred
var sum_to_n_b = function(n) {
    if (n <= 1) return n
    // no_sums = (n-1)/1 + 1 = n
    return ((n + 1) * n)/2
};

// regression
var sum_to_n_c = function(n) {
    if (n <= 1) return n 
    else return n + sum_to_n_c(n-1)
};
