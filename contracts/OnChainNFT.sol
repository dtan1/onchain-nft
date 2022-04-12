//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
//import {Base64} from "./Base64.sol";
import "hardhat/console.sol";

contract OnChainNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event Minted(uint tokenId);

    constructor() ERC721("OnChainNFT","ONNFT") {}


    //convert SVG image to Base64 string
    function formatSVGimageURI(string memory svg) public pure returns (string memory) {
        string memory baseURL = "data:image/svg+xml;base64,";
        string memory base64EncodedSVG = Base64.encode(bytes(svg));
        return string(abi.encodePacked(baseURL, base64EncodedSVG));
    }

    //generate tokenURI as a Base64 string
    function formatTokenURI(string memory imageURI) public pure returns(string memory) {
        string memory baseURL = "data:application/json;base64,";
        string memory json = string(
                abi.encodePacked(
                     '{"name": "On-chain NFT", "description": "onchain NFT with svg image", "image": "', 
                       imageURI, '"}'
                )
        );
        string memory base64EncodedJSON = Base64.encode(bytes(json));
        return string(abi.encodePacked(baseURL, base64EncodedJSON));

    }

    function mint(string memory svg) public  returns(uint) {
        string memory imageURI = formatSVGimageURI(svg);
        string memory tokenURI = formatTokenURI(imageURI);

        _tokenIds.increment();
        uint newItemId = _tokenIds.current();
        // console.log("newItemId is " , newItemId);  
        // console.log("tokenURI is ", tokenURI);     

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, tokenURI);
        emit Minted(newItemId);

        return newItemId;
    }

}

