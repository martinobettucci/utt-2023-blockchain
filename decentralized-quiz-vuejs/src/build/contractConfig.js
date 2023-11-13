// eslint-disable-next-line no-unused-vars
export async function contractABI() {
    return await fetch('/contracts/Quiz.json')
        .then(response => response.json())
        .then(data => {
            // Process the loaded JSON data
            // You can access the data properties and manipulate them as needed
            // For example, you can populate HTML elements with the data
            return data.abi;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// eslint-disable-next-line no-unused-vars
export function contractAddress() {
    return "0xc3A09BE59Bd3AF3660b225D87CeE647B8d009336";
}