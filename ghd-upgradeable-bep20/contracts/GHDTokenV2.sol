// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./GHDToken.sol";

contract GHDTokenV2 is GHDToken {
    function version() external virtual override view returns (string memory){
        return "v1.0.2";
    }
}

contract GHDTokenV3 is GHDToken {
    function version() external virtual override view returns (string memory){
        return "v1.0.3";
    }
}