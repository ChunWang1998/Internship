pragma solidity ^0.4.23;

contract ERC721 {
  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _tokenId
  );
  event Approval(
    address indexed _owner,
    address indexed _approved,
    uint256 _tokenId
  );
  event ApprovalForAll(
    address indexed _owner,
    address indexed _operator,
    bool _approved
  );

  function balanceOf(address _owner) public view returns (uint256 _balance);
  function ownerOf(uint256 _tokenId) public view returns (address _owner);
  function exists(uint256 _tokenId) public view returns (bool _exists);

  function approve(address _to, uint256 _tokenId) public;
  function getApproved(uint256 _tokenId)
    public view returns (address _operator);

  function setApprovalForAll(address _operator, bool _approved) public;
  function isApprovedForAll(address _owner, address _operator)
    public view returns (bool);

  function transferFrom(address _from, address _to, uint256 _tokenId) public;
  function safeTransferFrom(address _from, address _to, uint256 _tokenId)
    public;

  function safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId,
    bytes _data
  )
    public;
}

contract CryptoArteSales {

    event Sent(address indexed payee, uint256 amount, uint256 balance);
    event Received(address indexed payer, uint tokenId, uint256 amount, uint256 balance);

    ERC721 public nftAddress;
    address public receiver;

    constructor() public { 
        receiver = 0xb0f5350264f4c876f355970a42efdbb4df2b6426;
    }
// approve address(this) on token contract first (by token owner)
    function depositNFT(address _nftAddress,uint256 _tokenId) public   {
        require(msg.sender != address(0) && msg.sender != address(this),"1");
        require(_nftAddress != address(0) && _nftAddress != address(this),"3");

        nftAddress = ERC721(_nftAddress);
        nftAddress.safeTransferFrom( msg.sender,receiver, _tokenId);
   
    }
// approve address(this) on token contract first (by receiver)
    function withdrawNFT(address _nftAddress,uint256 _tokenId) public   {
        require(msg.sender != address(0) && msg.sender != address(this),"1");
        require(_nftAddress != address(0) && _nftAddress != address(this),"3");

        nftAddress = ERC721(_nftAddress);
        //receiver.approve(address(this),_tokenId);
        nftAddress.safeTransferFrom( receiver,msg.sender, _tokenId);
   
    }
 

}