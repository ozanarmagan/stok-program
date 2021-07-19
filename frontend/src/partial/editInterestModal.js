import { useState } from "react";
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {FiEdit} from 'react-icons/fi';
export default function EditInterest(props) {

    const [open,setOpen] = useState(false);

    const [i_m,setim] = useState(props.count);
    const [i_a,setia] = useState(props.amount);

    const toggle = () => setOpen(!open);
    const onChangeim = (event) => setim(event.target.value);
    const onChangeia = (event) => setia(event.target.value);
    return(
        <div className="col-1" style={{marginRight:"20px"}}>
            <Button color="primary" onClick={toggle}><FiEdit/></Button>
            <Modal isOpen={open} toggle={() => setOpen(!open)}>
                <ModalHeader>
                    Düzenle
                </ModalHeader>
                <ModalBody>
                    <Label>Taksit Sayısı</Label>
                    <Input className="form-control" value={i_m} onChange={onChangeim}/>
                    <Label>Vade Farkı</Label>
                    <Input className="form-control" value={i_a} onChange={onChangeia}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => props.edit(i_m,i_a,props.index,toggle)}>Düzenle</Button>
                    <Button color="danger" onClick={toggle}>İptal</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}