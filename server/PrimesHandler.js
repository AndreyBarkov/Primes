class PrimesHandler {

    static findPrimesMedian(limit) {
        if (limit < 2) {
            return Promise.reject('Invalid limit value');
        }
        const sieve = new Array(limit).fill(true);
        for (let i = 2; i < Math.sqrt(limit); i++) {
            if (sieve[i]) {
                for (let j = Math.pow(i, 2); j < limit; j += i) {
                    sieve[j] = false;
                }
            }
        }
        const primes = sieve.reduce((primes, isPrime, i) => {
            if (isPrime && i > 1) {
                primes.push(i)
            }
            return primes
        }, [])
        const median = this.findArrayMedian(primes)
        return Promise.resolve(median);
    }
    static findArrayMedian (arr){
        const len = arr.length;
        if(len % 2 === 0){
            return [
                arr[Math.round(len/2)-1],
                arr[Math.round(len/2)],
            ]
        }
        return [arr[Math.round(len/2)-1]];
    }
}
module.exports = PrimesHandler;