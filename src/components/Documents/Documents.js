import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Alert, Spinner, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Particle from '../Particle';
import Login from '../Login';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { pdfjs, Document, Page } from 'react-pdf';
import { FiDownload } from 'react-icons/fi';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function Documents({ particlesEnabled }) {
  const { t, i18n } = useTranslation();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(null);
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [currentFileName, setCurrentFileName] = useState('');

  const supportedFileTypes = ['pdf'];
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };


  const fileInfo = [
    {
      name: 'cv.pdf',
      Title: t('cv'),
      description: t('cv_description'),
      category: 'cv'
    },
    {
      name: 'debi.pdf',
      Title: t('debi_title'),
      description: t('debi_description'),
      category: 'certificates'
    },
    {
      name: 'kred.pdf',
      Title: t('kred_title'),
      description: t('kred_description'),
      category: 'certificates'
    },
    {
      name: 'kurs2.pdf',
      Title: t('praxis_training_2'),
      description: t('praxis_training_description'),
      category: 'gibb_zeugnisse'
    },
    {
      name: 'zeugnisgibb.pdf',
      Title: t('gibb_zeugnisse'),
      description: t('zeugnis_gibb_description'),
      category: 'gibb_zeugnisse'
    },
    {
      name: 'kurs3.pdf',
      Title: t('praxis_training_3'),
      description: t('praxis_training_description'),
      category: 'gibb_zeugnisse'
    },
    {
      name: 'kurs4.pdf',
      Title: t('praxis_training_4'),
      description: t('praxis_training_description'),
      category: 'gibb_zeugnisse'
    },
    {
      name: 'zeugnisbwd.pdf',
      Title: t('bwd_zeugnis'),
      description: t('zeugnis_bwd_description'),
      category: 'bwd_zeugnis'
    },
    {
      name: 'KNW106.pdf',
      Title: t('KNW106_title'),
      description: t('KNW106_description'),
      category: 'überbetriebliche_kurse'
    },
    {
      name: 'KNW187.pdf',
      Title: t('KNW187_title'),
      description: t('KNW187_description'),
      category: 'überbetriebliche_kurse'
    },
    {
      name: 'KNW210.pdf',
      Title: t('KNW210_title'),
      description: t('KNW210_description'),
      category: 'überbetriebliche_kurse'
    },
    {
      name: 'KNW294.pdf',
      Title: t('KNW294_title'),
      description: t('KNW294_description'),
      category: 'überbetriebliche_kurse'
    },
    {
      name: 'KNW295.pdf',
      Title: t('KNW295_title'),
      description: t('KNW295_description'),
      category: 'überbetriebliche_kurse'
    },
    {
      name: 'KNW335.pdf',
      Title: t('KNW335_title'),
      description: t('KNW335_description'),
      category: 'überbetriebliche_kurse'
    }
  ];
  
  
  useEffect(() => {
    fetchFiles();
  }, [role, i18n.language]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          setToken(null);
          return;
        }

        setRole(decodedToken.role);
        localStorage.setItem('token', token);
        const intervalId = startTokenRenewal();

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocus);

        return () => {
          clearInterval(intervalId);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          window.removeEventListener('focus', handleFocus);
        };
      } catch (e) {
        setToken(null);
      }
    } else {
      localStorage.removeItem('token');
      setRole(null);
    }
  }, [token]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/files`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Combine fetched files with local info
      const filesWithInfo = response.data.files.map(file => {
        const info = fileInfo.find(info => info.name === file.filePath) || {};
        return { ...file, ...info };
      });

      setFiles(filesWithInfo);
      setError('');
    } catch (error) {
      console.error('Error fetching files:', error);
      if (error.response && error.response.status === 401) {
        setToken(null);
      } else {
        setError(t('error_fetching_files'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (filePath) => {
    const ext = filePath.split('.').pop().toLowerCase();
    if (supportedFileTypes.includes(ext)) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/preview?fileName=${filePath}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        if (ext === 'pdf') {
          setPdfUrl(url);
          setIsFullscreen(true);
          setPreviewFile(null);
        } else {
          setPdfUrl(null);
          setPreviewFile(url);
        }
        setCurrentFileName(filePath);
        setShowModal(true);
        setTimeout(() => window.URL.revokeObjectURL(url), 1000);
      } catch (error) {
        console.error('Error previewing file:', error);
        setError(t('error_preview_not_available'));
      }
    } else {
      setError(t('error_preview_not_available'));
    }
  };

  const handleDownloadZip = async (filesToDownload) => {
    if (filesToDownload.length === 0) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/download-zip`,
        { files: filesToDownload },
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
        }
      );

      const fileName =
        filesToDownload.length === 1 ? filesToDownload[0].split('/').pop() : 'files.zip';

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

  const handleDownloadAll = () => {
    const allStoredNames = files.map((file) => file.filePath);
    if (allStoredNames.length > 0) {
      handleDownloadZip(allStoredNames);
    }
  };

  const handleDirectDownload = (filePath) => {
    handleDownloadZip([filePath]);
  };

  const renewToken = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/renew-token`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

  const groupedFiles = files.reduce((groups, file) => {
    const category = file.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(file);
    return groups;
  }, {});

  if (!token) {
    return <Login setToken={setToken} />;
  }

  const handleDownloadCurrentFile = () => {
    if (currentFileName) {
      handleDirectDownload(currentFileName);
    }
  };


  const categoryOrder = {
    cv: 1,
    gibb_zeugnisse: 2,    
    überbetriebliche_kurse: 3,
    bwd_zeugnis: 4,
    certificates: 5
  };

  const sortedCategories = Object.keys(groupedFiles).sort((a, b) => categoryOrder[a] - categoryOrder[b]);

  return (
    <div>
      <Container fluid className="resume-section" style={{ minHeight: '100vh' }}>
        {particlesEnabled && <Particle />}
        <div className="docs-container">
          <h1 style={{ fontSize: '2.4em' }}>
            {t('download_files_title')}
            <strong className="main-name"> {t('files')}</strong>
          </h1>
          <Button
            variant="secondary"
            style={{ margin: "5px" }}
            onClick={handleDownloadAll}
            disabled={files.length === 0}
          >
            {t('download_all')}
          </Button>
          <div id="poda"></div>
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          <div className="text-center mt-3">
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <div>
                {sortedCategories.map((category, index) => (
                  <div key={index} className="category-section">
                    <h2 style={{marginBottom: "40px"}}>{t(category)}</h2>
                    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
                      {groupedFiles[category].map((file, idx) => (
                        <Col key={idx} md={4} className="mb-3">
                          <Card className='filecard'>
                            <Card.Body>
                              <Card.Title>{file.Title || file.filePath}</Card.Title>
                              <Card.Text>{file.description || t('no_description')}</Card.Text>
                              <div className="d-flex justify-content-center">
                                <Button
                                  variant="primary"
                                  style={{margin: "10px"}}
                                  className='previewbutton'
                                  onClick={() => handlePreview(file.filePath)}
                                >
                                  {t('preview')}
                                </Button>
                                <Button
                                  variant="secondary"
                                  style={{margin: "10px"}}
                                  onClick={() => handleDirectDownload(file.filePath)}
                                >
                                  <FiDownload /> {t('download')}
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            variant="secondary"
            style={{ margin: "5px" }}
            onClick={handleDownloadAll}
            disabled={files.length === 0}
          >
            {t('download_all')}
          </Button>
        </div>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          className='fullscreen-dialog'
          dialogClassName={isFullscreen ? 'fullscreen-dialog' : ''}
          fullscreen={isFullscreen}
          contentClassName={isFullscreen ? 'fullscreen-content' : ''}
        >
            <Modal.Header>
              <div className="pdf-nav">
                <div className="nav-left">
                  <span className="file-name-header">{currentFileName}</span> {/* Display current file name */}
                </div>
                <div className="nav-right">                
                  <Button variant="primary" onClick={() => setShowModal(false)}>
                    {t('close')}
                  </Button>
                  <Button
                      style={{margin: "5px"}}
                      variant="secondary"
                      onClick={handleDownloadCurrentFile}
                    >
                      <FiDownload />
                  </Button>
                </div>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="pdf-preview">
                <div className="pdf-container">
                  <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="pdf-document"
                    style={{ overflow: "hidden"  }}
                  >
                    {Array.from({ length: numPages }, (_, index) => (
                      <div key={index} id={`page-${index}`} className="pdf-page-wrapper" style={{ height: "850px"}}>
                        <Page
                          pageNumber={index + 1}
                          className="pdf-page"
                          style={{ overflow: "hidden"  }}
                        />
                      </div>
                    ))}
                  </Document>
                </div>
              </div>
            </Modal.Body>
        </Modal>      
      </Container>
    </div>
  );
}

export default Documents;
