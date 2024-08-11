import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Alert, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import Login from "../Login";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

function Documents({ particlesEnabled }) {
  const { t } = useTranslation();
  const [width, setWidth] = useState(1200);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const supportedFileTypes = ['pdf', 'jpg', 'jpeg', 'png'];

  //const API_BASE_URL = 'http://localhost:3000';   
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setRole(decodedToken.role);
      fetchFiles();
      const intervalId = startTokenRenewal();

      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("focus", handleFocus);

      return () => {
        clearInterval(intervalId);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("focus", handleFocus);
      };
    } else {
      localStorage.removeItem('token');
      setRole(null);
    }
  }, [token]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/files`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('Files fetched:', response.data);
      setFiles(response.data.files || []); // Sicherstellen, dass files immer ein Array ist
      setError('');
    } catch (error) {
      console.error('Error fetching files:', error);
      setError(t('error_fetching_files'));
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully', response.data);
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error.response && error.response.status === 401) {
        setToken(null);
      }
    }
  };

  const handlePreview = (filePath) => {
    const ext = filePath.split('.').pop().toLowerCase();
    if (supportedFileTypes.includes(ext)) {
      if (ext === 'pdf') {
        window.open(`${API_BASE_URL}/uploads/${filePath}`, '_blank');
      } else {
        setPreviewFile(filePath);
        setShowModal(true);
      }
    } else {
      setError(t('error_preview_not_available'));
    }
  };

  const handleCheckboxChange = (filePath) => {
    setSelectedFiles(prevSelectedFiles =>
      prevSelectedFiles.includes(filePath)
        ? prevSelectedFiles.filter(file => file !== filePath)
        : [...prevSelectedFiles, filePath]
    );
  };

  const handleDownloadZip = async (selectedFiles) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/download-zip`, { files: selectedFiles }, {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'files.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading zip:', error);
      if (error.response && error.response.status === 401) {
        setToken(null);
      }
    }
  };

  const handleDownloadSelected = () => {
    if (selectedFiles.length > 0) {
      handleDownloadZip(selectedFiles);
    }
  };

  const handleDownloadAll = () => {
    const allStoredNames = files.map(file => file.filePath);
    if (allStoredNames.length > 0) {
      handleDownloadZip(allStoredNames);
    }
  };

  const renewToken = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/renew-token`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Error renewing token:', error);
      setToken(null);
    }
  };

  const startTokenRenewal = () => {
    return setInterval(() => {
      renewToken();
    }, 55 * 60 * 1000);
  };

  const handleVisibilityChange = () => {
    if (!document.hidden) {
      renewToken();
    }
  };

  const handleFocus = () => {
    renewToken();
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <Container fluid className="resume-section" style={{ minHeight: "100vh" }}>
        {particlesEnabled && <Particle />}
        <div className="docs-container">
          {role === 'admin' && (
            <div>
              <input type="file" onChange={handleUpload} />
            </div>
          )}
          <h1 style={{ fontSize: "2.4em" }}>
            {t('download_files_title')}
            <strong className="main-name"> {t('files')}</strong>
          </h1>

          {loading ? (
            <div className="loading-container">
              <Spinner animation="border" role="status" color="#c770f0" className="sr-only">
                <span ></span>
              </Spinner>
            </div>
          ) : (
            <>
              {files.length === 0 && <Alert variant="info">{t('no_files_available')}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <br />

              <Row>
                <Col>
                  {files.map((file, index) => (
                    <div key={index} className="file-item">
                      <input
                        className="file-checkbox"
                        type="checkbox"
                        onChange={() => handleCheckboxChange(file.fileName)}
                      />
                      <span className="file-name">{file.fileName}</span>
                      <Button
                        className="previewbutton"
                        onClick={() => handlePreview(file.fileName)}
                        disabled={!supportedFileTypes.includes(file.fileName.split('.').pop().toLowerCase())}
                      >
                        {t('preview')}
                      </Button>
                    </div>
                  ))}
                </Col>
              </Row>
              <Button
                className="downloadbutton"
                variant="primary"
                onClick={handleDownloadSelected}
                disabled={selectedFiles.length === 0}
              >
                {t('download_selected')}
              </Button>

              <Button
                variant="secondary"
                style={{ margin: "5px" }}
                onClick={handleDownloadAll}
                disabled={files.length === 0}
              >
                {t('download_all')}
              </Button>
            </>
          )}
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} className="modaldocuments">
          <Modal.Header>
            <Modal.Title>{t('image_preview')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-content" >
              {previewFile && <img src={`${API_BASE_URL}/uploads/${previewFile}`} alt={t('image_preview')} style={{ width: '100%', borderRadius: '10px' }} />}
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Documents;
