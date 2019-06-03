pragma solidity >=0.4.13 ;//<0.6.0;
//pragma experimental ABIEncoderV2;

contract RegistroAutorContract {

	struct Documento{
	    address Id; 
		string HashDocumento;
		string NombreDocumento;
	}

	mapping (address => Documento) public Documentos;
	address[] public AutorAccts;

	function RegistrarDocumento(string memory hashDoc, string memory nombreDoc) public{	    
		Documentos[msg.sender] = Documento({
		    Id : msg.sender,
		    HashDocumento : hashDoc,
		    NombreDocumento : nombreDoc
		});
	}

    // Lista los documentos registrados por usuario
    function ListarDocumentos(address id) view public returns (string memory HashDocumento, string memory NombreDocumento) {
		return(Documentos[id].HashDocumento, Documentos[id].NombreDocumento);
    }
}