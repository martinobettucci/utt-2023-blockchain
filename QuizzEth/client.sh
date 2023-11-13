# Restore the hashes from the blockchain
export CONTRACT_ADDRESS="$(docker exec -it myhd cat .contract)";
export WALLET_ADDRESS="$(docker exec -it myhd cat .wallet)";
echo "
CONTRACT_ADDRESS=$CONTRACT_ADDRESS
WALLET_ADDRESS=$WALLET_ADDRESS
" > .env;
# Then clean up those values, don't want those living in the server
unset CONTRACT_ADDRESS;
unset WALLET_ADDRESS;

# Run the client
node client/node.js
