import Button from '@ui/Button';
import Modal from '@ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function CreateCabinFormToggle() {
	return (
		<div>
			<Modal>
				<Modal.Trigger windowToOpen='create-cabin-form'>
					<Button>Add New Cabin</Button>
				</Modal.Trigger>

				<Modal.Window name='create-cabin-form'>
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default CreateCabinFormToggle;
