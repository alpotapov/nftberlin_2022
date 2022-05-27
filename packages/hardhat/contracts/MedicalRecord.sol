//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MedicalRecord is ERC721, Ownable
 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping (uint256 => string) private _doctorsNotes;

    constructor() public ERC721("MedicalRecord", "MR") {}

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory _doctorsNote = _doctorsNotes[tokenId];

        return _doctorsNote;
    }

    function mintRecord(address to, string memory _doctorsNote)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _mint(to, id);
        _setTokenURI(id, _doctorsNote);
        _doctorsNotes[id] = _doctorsNote;

        return id;
    }

    function recordsOf(address _patient)
        public
        view
        returns (uint256[] memory medicalRecords, string[] memory doctorsNotes)
    {
        uint256 nRecords = balanceOf(_patient);
        medicalRecords = new uint256[](nRecords);
        doctorsNotes = new string[](nRecords);
        for(uint256 i = 0; i < nRecords; i++) {
            medicalRecords[i] = tokenOfOwnerByIndex(_patient, i);
            doctorsNotes[i] = tokenURI(medicalRecords[i]);
        }
    }
}