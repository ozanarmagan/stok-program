import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { IconButton, Tooltip } from "@material-ui/core";
import { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import AddBoxIcon from '@material-ui/icons/AddBox';
export default function AddStock(props) {
    const [open,setOpen] = useState(false);
    const [stock,setStock] = useState(0);
    const toggle = () => setOpen(!open);



    const changeStock = (event) => {
        setStock(parseInt(event.target.value));
    }

    return(
        <span>
            <Tooltip title="Stok Ekle">
            <IconButton style={{color:"#b71c1c"}} onClick={toggle}>
                <AddBoxIcon  style={{fontSize:"2rem",color:"#06ab0b"}} />
            </IconButton>
            </Tooltip>
                <Modal isOpen={open} toggle={() => setOpen(!open)}>
                <ModalHeader>
                    Stok Ekle
                </ModalHeader>
                <ModalBody>
                    <div className="row justify-content-center">
                        <div className="col-2">
                            <Tooltip title="Azalt">
                                <IconButton onClick={() => {if(stock > 0) setStock(stock - 1)}}>
                                    <RemoveIcon color="danger"/>
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className="col-2">
                            <Input className="form-control" value={stock} style={{marginTop:"5px"}} onChange={changeStock} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} />
                        </div>
                        <div className="col-2">
                            <Tooltip title="Arttır">
                                <IconButton onClick={() => setStock(stock + 1)}>
                                    <AddIcon color="success"/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => {props.add(props.id,stock,toggle,props.init,props.image)}}>Ekle</Button>
                    <Button color="danger text-white" onClick={toggle}>İptal</Button>
                </ModalFooter>
            </Modal>
        </span>
    )
}