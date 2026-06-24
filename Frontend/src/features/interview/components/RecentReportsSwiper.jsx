import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Popconfirm, message } from 'antd';
import { DeleteOutlined, ArrowRightOutlined, ArrowUpOutlined } from '@ant-design/icons';
import axios from 'axios';

const RecentReportsSwiper = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecentReports = async () => {
            try {
                const token = localStorage.getItem('token');
                // Removed ?limit=6 to fetch all for See More functionality
                const response = await axios.get('http://localhost:3000/api/interview/reports', {
                    withCredentials: true,
                    headers: {
                        Authorization: token ? `Bearer ${token}` : ''
                    }
                });
                if (response.data && response.data.interviewReports) {
                    setReports(response.data.interviewReports);
                }
            } catch (error) {
                message.error('Failed to load recent reports');
            } finally {
                setLoading(false);
            }
        };

        fetchRecentReports();
    }, []);

    const handleDelete = async (reportId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/interview/report/${reportId}`, {
                withCredentials: true,
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            });
            setReports((prev) => prev.filter((r) => r._id !== reportId));
            message.success('Report deleted successfully');
        } catch (error) {
            message.error('Failed to delete report');
        }
    };

    if (loading) {
        return <div style={{ color: '#7d8590', padding: '2rem 0' }}>Loading recent reports...</div>;
    }

    if (reports.length === 0) {
        return null;
    }

    const displayedReports = showAll ? reports : reports.slice(0, 6);

    return (
        <section className='recent-reports-swiper' style={{ width: '100%', maxWidth: '1200px', marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#e6edf3', marginBottom: '1rem' }}>
                My Recent Interview Plans
            </h2>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '16px',
                paddingBottom: '1rem',
                maxHeight: showAll ? '550px' : 'none', // Approx 3 rows of height
                overflowY: showAll ? 'auto' : 'visible',
                paddingRight: showAll ? '8px' : '0' // space for scrollbar
            }}>
                {displayedReports.map((report) => (
                    <div 
                        key={report._id}
                        className="report-card"
                        style={{
                            backgroundColor: '#161b22',
                            border: '1px solid #2a3348',
                            borderRadius: '0.75rem',
                            padding: '1.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            width: '100%',
                            minHeight: '160px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, border-color 0.2s',
                            position: 'relative'
                        }}
                        onClick={() => navigate(`/interview/${report._id}`)}
                        onMouseOver={(e) => { e.currentTarget.style.borderColor = '#ff2d78'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                        onMouseOut={(e) => { e.currentTarget.style.borderColor = '#2a3348'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h3 style={{ fontSize: '1rem', color: '#e6edf3', margin: 0, paddingRight: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {report.title || 'Untitled Position'}
                            </h3>
                            
                            <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: '1.25rem', right: '1rem' }}>
                                <Popconfirm
                                    title="Delete Report"
                                    description="Are you sure you want to delete this report?"
                                    onConfirm={() => handleDelete(report._id)}
                                    okText="Yes"
                                    cancelText="No"
                                    okButtonProps={{ danger: true }}
                                >
                                    <DeleteOutlined style={{ color: '#ff2d78', fontSize: '1.1rem', cursor: 'pointer' }} />
                                </Popconfirm>
                            </div>
                        </div>

                        <p style={{ fontSize: '0.8rem', color: '#7d8590', margin: 0 }}>
                            Generated on {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                        
                        <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                            <span style={{
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '1rem',
                                backgroundColor: report.matchScore >= 80 ? 'rgba(0, 178, 135, 0.15)' : report.matchScore >= 60 ? 'rgba(255, 191, 63, 0.15)' : 'rgba(255, 45, 120, 0.15)',
                                color: report.matchScore >= 80 ? '#00b287' : report.matchScore >= 60 ? '#ffbf3f' : '#ff2d78'
                            }}>
                                Match Score: {report.matchScore}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {reports.length > 6 && (
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-start' }}>
                    <div 
                        className="see-more-btn"
                        onClick={() => setShowAll(!showAll)}
                        style={{
                            backgroundColor: 'rgba(28, 34, 48, 0.4)',
                            border: '1px solid #2a3348',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 45, 120, 0.1)'; e.currentTarget.style.borderColor = '#ff2d78' }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(28, 34, 48, 0.4)'; e.currentTarget.style.borderColor = '#2a3348' }}
                    >
                        <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#e6edf3' }}>
                            {showAll ? 'See Less' : 'See More'}
                        </span>
                        {showAll ? <ArrowUpOutlined style={{ color: '#ff2d78' }} /> : <ArrowRightOutlined style={{ color: '#ff2d78' }} />}
                    </div>
                </div>
            )}
        </section>
    );
};

export default RecentReportsSwiper;
