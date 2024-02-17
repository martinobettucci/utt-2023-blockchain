// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyCryptoKitties is ERC721, ERC2981, Ownable {

    constructor() Ownable(msg.sender) ERC721("MyCryptoKitties", "MKC") {
        _setDefaultRoyalty(owner(), 10000);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC2981, ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _safeMint(address to, uint256 tokenId, bytes memory data) internal override onlyOwner {
        super._safeMint(to, tokenId, data);
    }
}