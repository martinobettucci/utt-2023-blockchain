const {Web3} = require('web3')

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);

        try {
            // Request account access if needed
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            // Accounts now exposed


            let electionContract;
            try {
                const abiResponse = await fetch('/abi/Election.json');
                if (!abiResponse.ok) {
                    throw new Error(`HTTP error! status: ${abiResponse.status}`);
                }
                const abiData = await abiResponse.json();

                const addressResponse = await fetch('/abi/ElectionAddress.txt');
                if (!addressResponse.ok) {
                    throw new Error(`HTTP error! status: ${addressResponse.status}`);
                }
                const addressData = await addressResponse.json();

                electionContract = new web3.eth.Contract(abiData.abi, addressData.address);
            } catch (error) {
                console.error('Error:', error);
            }

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
            });

            // Handle vote button click
            document.querySelector("#addVote").addEventListener("click", async () => {
                const candidateId = document.querySelector("#candidatesSelect").value;
                await electionContract.methods.vote(candidateId).send({from: accounts[0]});
            });

            document.getElementById("loader").style.display = "none";
            document.getElementById("content").style.display = "block";

            // Listen to Vote events and refresh the page
            electionContract.events.Voted({}).on('data', () => {
                alert('Someone have voted!')
                location.reload();
            });
            // New candidate
            electionContract.events.NewCandidate({}).on('data', () => {
                alert('A new candidate is available!')
                location.reload();
            });

        } catch (error) {
            // User denied account access
            console.error(error);
        }
    } else {
        console.log('Non-Ethereum browser detected. Consider trying MetaMask!');
    }
});
