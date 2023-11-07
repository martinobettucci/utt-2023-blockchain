window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);

        try {
            // Request account access if needed
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            // Accounts now exposed

            const contractAddress = "";
            const contractABI = [];

            const electionContract = new web3.eth.Contract(contractABI, contractAddress);

            let candidatesCount = await electionContract.methods.candidatesCount().call();
            for (let i = 1; i <= candidatesCount; i++) {
                let candidate = await electionContract.methods.candidates(i).call();
                // Populate the table with candidates
                const candidatesResults = document.querySelector("#candidatesResults");
                const candidatesSelect = document.querySelector("#candidatesSelect");
                const option = document.createElement("option");
                option.value = candidate.id;
                option.text = candidate.name;
                candidatesSelect.appendChild(option);
                candidatesResults.innerHTML += `<tr><th scope="row">${candidate.id}</th><td>${candidate.name}</td><td>${candidate.voteCount}</td></tr>`;
            }

            // Handle add candidate button click
            document.querySelector("#addCandidate").addEventListener("click", async () => {
                const candidateName = document.querySelector("#candidateName").value;
                await electionContract.methods.addCandidate(candidateName).send({from: accounts[0]});
                // Refresh the page after adding the candidate to update the table
                location.reload();
            });

            // Handle vote button click
            document.querySelector("#addVote").addEventListener("click", async () => {
                const candidateId = document.querySelector("#candidatesSelect").value;
                await electionContract.methods.vote(candidateId).send({ from: accounts[0] });
                // Refresh the page after voting to update the table
                location.reload();
            });

            document.getElementById("loader").style.display = "none";
            document.getElementById("content").style.display = "block";

            /* Listen to Vote events and refresh the page
            electionContract.events.Vote({}).on('data', () => {
              location.reload();
            });*/

        } catch (error) {
            // User denied account access
            console.error(error);
        }
    } else {
        console.log('Non-Ethereum browser detected. Consider trying MetaMask!');
    }
});
