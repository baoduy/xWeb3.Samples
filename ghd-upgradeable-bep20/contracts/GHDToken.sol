// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BEP20Upgradeable.sol";
import "./IGHDTokenVersioning.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract GHDToken is BEP20Upgradable, OwnableUpgradeable, IGHDTokenVersioning {

    function initialize(address owner_)  public initializer {
        __BEP20_init("GHD Loyal Token", "GHD");
        __Ownable_init();

        _transferOwnership(owner_);
        _mint(msg.sender, 9900000 * 10 ** decimals());
    }

    function version() external virtual override view returns (string memory){
        return "v1.0.0";
    }

    /**
     * @dev Returns the bep token owner.
     */
    function getOwner() external virtual override view returns (address) {
        return owner();
    }

    /* solium-disable-next-line */
    function _authorizeUpgrade (address newImplementation) internal override onlyOwner {
    }
}