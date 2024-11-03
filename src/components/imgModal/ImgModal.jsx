import { useState, useEffect } from 'react';
import { GoHeartFill } from 'react-icons/go';
import { MdOutlineDescription } from 'react-icons/md';
import { FaDownload } from 'react-icons/fa6';
import s from './imgModal.module.css';

import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');
const ImgModal = ({ setModal, addOpen, resetAddOpen }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const ModalImgComponent = () => {
    if (setModal.length > 0) {
      const { urls, alt_description, likes, description, links } = setModal[0];
      return (
        <div className={s.modalContainer}>
          <img src={urls.regular} alt={alt_description} loading='lazy' />
          <ul>
            <li>
              Likes <GoHeartFill /> - <span>{likes}</span>
            </li>
            <li>
              Description <MdOutlineDescription /> - <span>{description}</span>
            </li>
            <li>
              <a href={links.download}>
                Link for download
                <FaDownload />
              </a>
            </li>
          </ul>
        </div>
      );
    }
  };

  useEffect(() => {
    if (addOpen) {
      setIsOpen(true);
      resetAddOpen();
    }
  }, [addOpen, resetAddOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName={s.overlay}
        style={customStyles}
        contentLabel='Modal Images'
      >
        <ModalImgComponent />
      </Modal>
    </div>
  );
};

export default ImgModal;
