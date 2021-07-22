import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
export default function DeleteProduct(props)  {
    const [open,setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    return (
        <span>                
        <IconButton style={{color:"#b71c1c"}} onClick={toggle}>
            <DeleteIcon />
        </IconButton>
        <Modal isOpen={open} toggle={() => setOpen(!open)}>
                <ModalHeader>
                    Ürünü Sil
                </ModalHeader>
                <ModalBody>
                    Bu Ürünü Silmek İstediğinize Emin Misiniz?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => {props.delete(props.id,toggle)}}>Sil</Button>
                    <Button color="info text-white" onClick={toggle}>İptal</Button>
                </ModalFooter>
            </Modal>
        </span>
    )
}