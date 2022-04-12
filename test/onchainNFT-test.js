const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OnChainNFT", function () {
    let onChainNFT;

    //SVG image that you want to mint
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1024' height='1024'>
                <defs><clipPath id='a'><path d='M0 0h1024v1024H0z'/></clipPath></defs>
                <g clip-path='url(#a)'>
                  <path d='M0 0h1024v1024H0z'/>
                  <path fill='pink' d='M0 241h1024v20H0zM0 502h1024v20H0zM0 763h1024v20H0z'/>
                  <path fill='pink' d='M241 0h20v1024h-20z'/>
                </g>
              </svg>`;

    before(async function () {
        [owner, user1, user2, user3, user4] = await ethers.getSigners();
        console.log('owner.address is ' + owner.address);
    
        // const OnChainNFT = await ethers.getContractFactory("OnChainNFT");
        // onChainNFT = await OnChainNFT.deploy();
        // await onChainNFT.deployed();
    
      });

    describe("OnChainNFT testing ", function() {
        console.log("----------------------");
        beforeEach( async function () {       
            const OnChainNFT = await ethers.getContractFactory("OnChainNFT");
            onChainNFT = await OnChainNFT.deploy();
            await onChainNFT.deployed();
        
          });

        afterEach(async function () {
          console.log("owner balance is  " + await onChainNFT.balanceOf(owner.address));
          console.log("user1 balance is  " + await onChainNFT.balanceOf(user1.address));
          console.log("user2 balance is  " + await onChainNFT.balanceOf(user2.address));
        });


        it("should format imageURI correctly ", async function () {
          const imageURI = await onChainNFT.formatSVGimageURI(svg);
          console.log("imageURI is " + imageURI);
  
        });
  
        it("should format tokenURI correctly ", async function () {
            const tokenURI = await onChainNFT.formatTokenURI(svg);
            console.log("tokenURI is " + tokenURI);
    
        });


        it("should mint NFT correctly ", async function () {
              const txn = await onChainNFT.mint(svg);
              const txnReceipt = await txn.wait();
              const event = txnReceipt.events.find( (event)=> event.event === 'Minted');
              console.log("event log is " + JSON.stringify(event));
              console.log("event is " + event.event);
              const tokenId = event.args['tokenId'];
              console.log("tokenId from event log is " + tokenId);
              //expect( await onChainNFT.balanceOf(owner.address)).to.equal(1);
              expect(tokenId).to.equal(1);

              console.log("onChainNFT.address is " + onChainNFT.address);

              // console.log('Your minted NFT : ',
              //  `https://testnets.opensea.io/assets/${onChainNFT.address}/${tokenId}`
              // );
        

        });

        // it("should set tokenURI correctly ", async function () {
        //     const tokenURI_1 = "https://gateway.pinata.cloud/ipfs/QmP9EzgghobZKFWnaKtJTbBvBaZBmwaqU9dAcyL6iDUEzu";
        //     const tokenURI_2 = "https://opensea-creatures-api.herokuapp.com/api/creature/2";

        //     const tx1 = await onChainNFT.connect(user1).mintNFT(tokenURI_1);
        //     const tx2 = await onChainNFT.connect(user2).mintNFT(tokenURI_2);

        //     console.log(" tokenURI(1) is " + await onChainNFT.tokenURI(1));
        //     console.log(" tokenURI(2) is " + await onChainNFT.tokenURI(2));

        //     expect (await onChainNFT.tokenURI(1)).to.equal(tokenURI_1);
        //     expect (await onChainNFT.tokenURI(2)).to.equal(tokenURI_2);



        
        // });


    });

});

