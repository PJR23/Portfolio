import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Alert, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Particle from '../Particle';
import Login from '../Login';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { pdfjs, Document, Page } from 'react-pdf';
import { FiDownload } from 'react-icons/fi'; // Icon importiert

// Konfigurieren Sie den PDF.js Worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Zustand für Ladeanzeige
  const [pdfUrl, setPdfUrl] = useState(null); // Zustand für die PDF-URL
  const [pdfPageNumber, setPdfPageNumber] = useState(1); // Zustand für die PDF-Seite
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfWidth, setPdfWidth] = useState(window.innerWidth * 0.8);
  const [pdfHeight, setPdfHeight] = useState(window.innerHeight * 0.8);
  const [numPages, setNumPages] = useState(null);
  const [pdfScale, setPdfScale] = useState(1);


  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  
  useEffect(() => {
    if (isFullscreen) {
      setPdfWidth(window.innerWidth * 0.8);
      setPdfHeight(window.innerHeight * 0.8);
    } else {
      setPdfWidth(window.innerWidth * 0.3); // oder andere Standardwerte für nicht-Vollbild
      setPdfHeight(window.innerHeight * 0.4); // oder andere Standardwerte für nicht-Vollbild
    }
  }, [isFullscreen]);

  const supportedFileTypes = ['pdf', 'jpg', 'jpeg', 'png'];

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    setWidth(window.innerWidth);
    fetchFiles();
  }, [role]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setRole(decodedToken.role);
      const intervalId = startTokenRenewal();

      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus);

      return () => {
        clearInterval(intervalId);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('focus', handleFocus);
      };
    } else {
      localStorage.removeItem('token');
      setRole(null);
    }
  }, [token]);

  const fetchFiles = async () => {
    setLoading(true); // Ladeanzeige aktivieren
    try {
      const response = await axios.get(`${API_BASE_URL}/api/files`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setFiles(response.data.files);
      setError('');
    } catch (error) {
      console.error('Error fetching files:', error);
      setError(t('error_fetching_files'));
    } finally {
      setLoading(false); // Ladeanzeige deaktivieren
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
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      if (error.response && error.response.status === 401) {
        setToken(null);
      }
    }
  };

  const handlePreview = async (filePath) => {
    const ext = filePath.split('.').pop().toLowerCase();
    if (supportedFileTypes.includes(ext)) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/preview?fileName=${filePath}`, {
          headers: { 'Authorization': `Bearer ${token}` },
          responseType: 'blob'
        });
    
        const url = window.URL.createObjectURL(new Blob([response.data]));
        if (ext === 'pdf') {
          setPdfUrl(url); // Setzen Sie die PDF-URL
          setPreviewFile(null); // Leeren Sie den Bild-URL
        } else {
          setPdfUrl(null); // Leeren Sie die PDF-URL
          setPreviewFile(url);
        }
        setShowModal(true); // Zeigen Sie das Modal an
        // Revoke the object URL after previewing
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      } catch (error) {
        console.error('Error previewing file:', error);
        setError(t('error_preview_not_available'));
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
    if (selectedFiles.length === 0) return; // Falls keine Datei ausgewählt ist, nichts tun

    try {
        const response = await axios.post(`${API_BASE_URL}/api/download-zip`, { files: selectedFiles }, {
            headers: { 'Authorization': `Bearer ${token}` },
            responseType: 'blob'
        });

        const fileName = selectedFiles.length === 1 ? selectedFiles[0].split('/').pop() : 'files.zip';

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading file or zip:', error);
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

  const handleDirectDownload = (filePath) => {
    handleDownloadZip([filePath]);
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFiles = files.length > 0 
    ? files.filter(file => file.fileName.toLowerCase().includes(searchTerm.toLowerCase()))
    : []; // Nur filtern, wenn Dateien vorhanden sind

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
          <div id="poda">
            <div className="glow"></div>
            <div className="darkBorderBg"></div>
            <div className="darkBorderBg"></div>
            <div className="darkBorderBg"></div>
            <div className="white"></div>
            <div className="border"></div>
            <div id="main">
              <input
                placeholder={t('search_placeholder')}
                type="text"
                name="text"
                className="inputbar"
                value={searchTerm}
                onChange={handleSearch}
              />
              <div id="input-mask"></div>
              <div id="pink-mask"></div>
              <div className="filterBorder"></div>
              <div id="filter-icon">
                <svg
                  preserveAspectRatio="none"
                  height="27"
                  width="27"
                  viewBox="4.8 4.56 14.832 15.408"
                  fill="none"
                >
                  <path
                    d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
                    className="filtericoncolor"
                    stroke-width="1"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
              <div id="search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  height="24"
                  fill="none"
                  className="feather feather-search"
                >
                  <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
                  <line
                    stroke="url(#searchl)"
                    y2="16.65"
                    y1="22"
                    x2="16.65"
                    x1="22"
                  ></line>
                  <defs>
                    <linearGradient gradientTransform="rotate(50)" id="search">
                      <stop stop-color="#f8e7f8" offset="0%"></stop>
                      <stop stop-color="#b6a9b7" offset="50%"></stop>
                    </linearGradient>
                    <linearGradient id="searchl">
                      <stop stop-color="#b6a9b7" offset="0%"></stop>
                      <stop stop-color="#837484" offset="50%"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-container">
              <Spinner animation="border" role="status" color="#c770f0" className="sr-only">
                <span></span>
              </Spinner>
            </div>
          ) : (
            <>
              {filteredFiles.length === 0 && files.length > 0 && <Alert variant="info">{t('no_files_available')}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <br />

              <Row>
                <Col>
                  {filteredFiles.map((file, index) => (
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
                      <Button
                        style={{margin: "5px"}}
                        variant="secondary"
                        onClick={() => handleDirectDownload(file.fileName)}
                      >
                        <FiDownload />
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
        <Modal 
          show={showModal} 
          onHide={() => setShowModal(false)} 
          className={`${pdfUrl ? 'pdf-modal' : 'modaldocuments'} ${pdfUrl && isFullscreen ? 'fullscreen-dialog' : ''}`}
        >
          <Modal.Header>
            <div className="modal-header-content">
              <Modal.Title>{t('preview')}</Modal.Title>
              {pdfUrl && isFullscreen && (
                <div className="fullscreen-controls">
                  <label>
                    {t('scale')}: 
                    <input 
                      type="range" 
                      min="0.5" 
                      max="3" 
                      step="0.1" 
                      value={pdfScale} 
                      onChange={(e) => setPdfScale(parseFloat(e.target.value))} 
                      style={{ marginLeft: "10px" }} 
                    />
                  </label>
                </div>
              )}
              {pdfUrl && (
                <div className="fullscreen-button-container">
                  <Button 
                    variant="secondary" 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                  >
                    {isFullscreen ? t('exit_fullscreen') : t('fullscreen')}
                  </Button>
                </div>
              )}
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-content">
              {pdfUrl ? (
                <div className="pdf-container">
                  <Document
                    file={pdfUrl}
                    onLoadError={(error) => console.error('Error loading PDF:', error)}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {isFullscreen
                      ? Array.from(new Array(numPages), (el, index) => (
                        <div key={index} className="pdf-page">
                          <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={pdfWidth * pdfScale} // Skalierung anwenden
                            height={pdfHeight * pdfScale} // Skalierung anwenden
                          />
                        </div>
                      ))
                      : <Page pageNumber={1} width={pdfWidth} height={pdfHeight} />
                    }
                  </Document>
                </div>
              ) : (
                previewFile ? (
                  <img src={previewFile} alt={t('image_preview')} style={{ width: '100%', borderRadius: '10px' }} />
                ) : (
                  <div>{t('no_preview_available')}</div>
                )
              )}
            </div>
          </Modal.Body>
        </Modal>




      </Container>
    </div>
  );
}

export default Documents;
