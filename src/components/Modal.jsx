import React from 'react';

function Modal({ body, work ,func, modalId , mode}) {
    return (  
              <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${modalId}Label`}>Confirmation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            {body}
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className={`btn btn-${mode}`} data-bs-dismiss="modal"
             onClick={func}>
              {work}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Modal;