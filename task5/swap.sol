pragma solidity 0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
//refer: https://vomtom.at/how-to-use-uniswap-v2-as-a-developer/
contract SampleToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("SampleToken", "JT") {
        _mint(msg.sender, initialSupply);
    }
}
abstract contract RouterInterface {
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable {}
    
    address public WETH;
        
    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        payable
        virtual
        returns (uint[] memory amounts);
     function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        returns (uint[] memory amounts);
    
}