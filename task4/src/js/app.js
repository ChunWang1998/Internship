App = {
  web3Provider: null,
  contracts: {},
  web3: null,
  metadata_uri: null,
  contract_owner: null,
  transfer_test_addr:null,
  contractAddress:null,
  receiver:null,

  init: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    App.web3 = new Web3(App.web3Provider);

    return await App.initContract();
  },
  initContract: async function () {

    get_contract = async function(){
      contract = document.myForm.contract;
      contractAddress = contract.value;
      return await App.read_contract(contractAddress);
     }
     get_receiver = function(){
      receiverr = document.myForm.receiver;
      receiver = receiverr.value;
     }

  },  
  read_contract:async function(contractAddress){

    // rinkeby (doesn't work since can't access metadata)
    var contractABI = [{"inputs":[{"internalType":"address","name":"_proxyRegistryAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"baseTokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"mintTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    //var contractAddress ="0xd6fddf78025f70d8c0fc0784ee40882a004d57d4";

    //mainnet (work)
    // var contractAddress="0xe6212a0da1ebcedefeeee022083d86b9e97e5fef";

    App.contracts.erc721 = new App.web3.eth.Contract(contractABI, contractAddress);

    // set contract owner
    contract_owner = await this.contracts.erc721.methods
    .owner()
    .call()
    //console.log("owner: "+owner);

    //set test addr
    transfer_test_addr = "0x3CC46eD85f742CD9d2E8C0944FC3DCf776bb2Ff3";

    return await App.readTokenSupply();
  },
  readTokenSupply: async function () {
    var  amount;

    try {
      amount = await this.contracts.erc721.methods
        .totalSupply()
        .call()
      //console.log('Supply: ' + amount);
    } catch (e) {
      console.error(e)
    }

    return await App.get_metadata(amount);
  },
  get_metadata: async function(amount){
    var metadata_uris = [];
    var metadata_lens = [];

    try{
      for(var i =1;i <=amount; i ++){
        metadata_uri = await this.contracts.erc721.methods
          .tokenURI(i)
          .call()
        //console.log("get metadata website: " + metadata_uri)
        metadata_uris.push(metadata_uri);
        metadata_lens.push(metadata_uri.length)
      }
    } catch (e) {
      console.log(e)
    }
    if (metadata_uris.length!=amount) console.log("get metadata uri fail");
    else return await App.XML_setting(metadata_uris,amount,metadata_lens);
  },
  XML_setting: async function(metadata_uris,amount,metadata_lens){
  // reference:
  //https://kakadodo.github.io/2018/08/27/js-about-javascript-XMLHttpRequest/
    var _data = [];
    var init_index = 1;
    try{
      for(var i =0;i <amount; i ++){

      //grab json file to use
       
        getData(showData);

        async function showData(result,index){
          var jsonfile = JSON.parse(result);
          jsonfile.index = parseInt(index);
          _data.push(jsonfile);
          if(_data.length == amount) return await App.sort_data(_data,amount);
        };

        function getData(callback){
          var xhr =  new XMLHttpRequest()
          xhr.open('GET',metadata_uris[i], true)  //each metadata uri has diff speed to send
          xhr.index = init_index++;//pass the index for ordering
          xhr.send()
          xhr.onload =  function(){
            callback(this.responseText,xhr.index);
          }

        }
      }
    }catch(e){
      console.log(e);
    }

  },
  sort_data: async function(_data,amount){
    //make sure the ordering
    _data.sort(function(a, b) {
      return a.index - b.index;
    });
    return await App.HTML_setting(_data,amount);
  },
  HTML_setting: async function(_data,amount){
    var itemRow = $('#itemRow');
    var Template = $('#Template');

    for(var i =0;i < amount; i ++){

        Template.find('.panel-title').text(_data[i].name);
      
        Template.find('img').attr('src',_data[i].image);

        Template.find('.btn-adopt').attr('data-id', i+1);// put index into button 

        Template.find('.btn-transfer').attr('data-id', i+1);// put index into button 

        Template.find('.btn-adopt').attr('data-metadata', _data[i].description);// put metadata into button 

        Template.find('.btn-transfer').attr('data-metadata', _data[i].description);// put metadata into button 

        itemRow.append(Template.html());
    }
    return await App.bindEvents();
  },
  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.check_step);
    $(document).on('click', '.btn-transfer', App.transfer_step);
  },
  check_step: async function(event) {

    event.preventDefault();

    var metadata_id =  parseInt($(event.target).data('id'));
     console.log(metadata_id);

    var metadata =$(event.target).data('metadata');
    //console.log(metadata);
    document.getElementById("metadata_info").innerHTML = metadata;
    
  },
  transfer_step:  async function(event) {
    event.preventDefault();
    var metadata_id =  parseInt($(event.target).data('id'));
    token_owner = await App.contracts.erc721.methods
    .ownerOf(metadata_id)
    .call()
    //console.log("the token owner: "+token_owner);
    
    App.web3.eth.getAccounts().then(async function(addrs ){
      try{
      var addr = addrs[0];
      var metadata_id = parseInt($(event.target).data('id'));
      if(addr == token_owner){  
          await App.contracts.erc721.methods.transferFrom(addr, receiver, metadata_id)
          .send({
            from: addr
        });
      }   
      else console.log("you are not the token owner:"+ token_owner);
    }catch(e){
      alert(e.message);
    }
    });
  
  }

};
$(function() {
  $(window).load(function() {
    App.init();
  });
});