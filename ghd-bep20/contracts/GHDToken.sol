// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BEP20.sol";

contract GHDToken is BEP20Token {
    constructor() BEP20Token ("GHD Token","GHD", 9900000) {
    }
}