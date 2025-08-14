import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Practices() {
  const [selectedPractice, setSelectedPractice] = useState(null)

  const practices = [
    {
      id: 'cauti-prevention',
      title: 'CAUTI Prevention Bundle',
      description: 'Comprehensive approach to reduce catheter-associated urinary tract infections',
      category: 'Infection Prevention',
      status: 'Active',
      lastUpdated: '2024-01-15',
      details: {
        overview: 'Evidence-based protocol to reduce catheter-associated urinary tract infections (CAUTI) in healthcare settings.',
        keyComponents: [
          'Proper catheter insertion techniques',
          'Daily assessment for catheter necessity',
          'Aseptic technique during insertion and maintenance',
          'Hand hygiene protocols',
          'Catheter securement and positioning'
        ],
        outcomes: 'Reduces CAUTI rates by 25-40% when properly implemented',
        targetAudience: 'Urologists, nurses, and healthcare facilities',
        implementationTime: '4-6 weeks for full implementation',
        complianceRate: '85% average compliance across facilities'
      }
    },
    {
      id: 'intermittent-catheterization',
      title: 'Intermittent Catheterization Protocol',
      description: 'Best practices for intermittent catheterization in various care settings',
      category: 'Clinical Protocol',
      status: 'Active',
      lastUpdated: '2024-01-10',
      details: {
        overview: 'Standardized protocol for intermittent catheterization to improve patient outcomes and reduce complications.',
        keyComponents: [
          'Patient education and training',
          'Proper catheter selection and sizing',
          'Hygiene and infection prevention',
          'Frequency and timing guidelines',
          'Complication monitoring and management'
        ],
        outcomes: 'Improves patient satisfaction and reduces UTIs by 30%',
        targetAudience: 'Urologists, rehabilitation specialists, home care providers',
        implementationTime: '2-3 weeks for patient training',
        complianceRate: '92% patient compliance rate'
      }
    },
    {
      id: 'patient-education',
      title: 'Patient Education Framework',
      description: 'Structured approach to patient education for urological conditions',
      category: 'Education',
      status: 'Draft',
      lastUpdated: '2024-01-05',
      details: {
        overview: 'Comprehensive patient education framework covering various urological conditions and treatments.',
        keyComponents: [
          'Condition-specific educational materials',
          'Treatment option explanations',
          'Lifestyle modification guidance',
          'Follow-up care instructions',
          'Emergency contact information'
        ],
        outcomes: 'Improves patient understanding and treatment adherence by 45%',
        targetAudience: 'Patients, caregivers, and healthcare providers',
        implementationTime: '1-2 weeks for content development',
        complianceRate: '78% patient engagement rate'
      }
    },
    {
      id: 'quality-metrics',
      title: 'Quality Metrics Dashboard',
      description: 'Key performance indicators for urological care quality',
      category: 'Quality Management',
      status: 'Active',
      lastUpdated: '2024-01-12',
      details: {
        overview: 'Comprehensive dashboard for tracking and improving urological care quality metrics.',
        keyComponents: [
          'Patient outcome tracking',
          'Complication rate monitoring',
          'Treatment effectiveness metrics',
          'Patient satisfaction scores',
          'Resource utilization analysis'
        ],
        outcomes: 'Enables data-driven quality improvement initiatives',
        targetAudience: 'Healthcare administrators, quality managers, urologists',
        implementationTime: '6-8 weeks for full implementation',
        complianceRate: '88% facility adoption rate'
      }
    }
  ]

  const handleViewDetails = (practice) => {
    setSelectedPractice(practice)
  }

  const handleCloseDetails = () => {
    setSelectedPractice(null)
  }

  return (
    <div className='space-y-6'>
      <div className='bg-white rounded-2xl shadow p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-slate-900'>Best Practices</h1>
            <p className='text-slate-600 mt-1'>Evidence-based protocols and guidelines for urological care</p>
          </div>
          <Link 
            to='/' 
            className='px-4 py-2 rounded-lg bg-brand-primary text-white text-sm hover:bg-brand-primary/90 transition-colors'
          >
            Back to Dashboard
          </Link>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {practices.map((practice) => (
            <div key={practice.id} className='border rounded-xl p-4 hover:shadow-md transition-shadow'>
              <div className='flex items-start justify-between mb-3'>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  practice.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {practice.status}
                </span>
                <span className='text-xs text-slate-500'>{practice.category}</span>
              </div>
              
              <h3 className='font-semibold text-slate-900 mb-2'>{practice.title}</h3>
              <p className='text-sm text-slate-600 mb-3'>{practice.description}</p>
              
              <div className='flex items-center justify-between text-xs text-slate-500'>
                <span>Updated: {practice.lastUpdated}</span>
                <button 
                  onClick={() => handleViewDetails(practice)}
                  className='text-brand-primary hover:underline font-medium'
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Details Modal */}
      {selectedPractice && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-bold text-slate-900'>{selectedPractice.title}</h2>
                <button 
                  onClick={handleCloseDetails}
                  className='text-slate-400 hover:text-slate-600 text-2xl'
                >
                  ×
                </button>
              </div>
              
              <div className='space-y-4'>
                <div className='flex items-center gap-4 text-sm'>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedPractice.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedPractice.status}
                  </span>
                  <span className='text-slate-500'>{selectedPractice.category}</span>
                  <span className='text-slate-500'>Updated: {selectedPractice.lastUpdated}</span>
                </div>
                
                <div>
                  <h3 className='font-semibold text-slate-900 mb-2'>Overview</h3>
                  <p className='text-slate-600'>{selectedPractice.details.overview}</p>
                </div>
                
                <div>
                  <h3 className='font-semibold text-slate-900 mb-2'>Key Components</h3>
                  <ul className='list-disc list-inside text-slate-600 space-y-1'>
                    {selectedPractice.details.keyComponents.map((component, index) => (
                      <li key={index}>{component}</li>
                    ))}
                  </ul>
                </div>
                
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <h3 className='font-semibold text-slate-900 mb-2'>Expected Outcomes</h3>
                    <p className='text-slate-600 text-sm'>{selectedPractice.details.outcomes}</p>
                  </div>
                  <div>
                    <h3 className='font-semibold text-slate-900 mb-2'>Target Audience</h3>
                    <p className='text-slate-600 text-sm'>{selectedPractice.details.targetAudience}</p>
                  </div>
                  <div>
                    <h3 className='font-semibold text-slate-900 mb-2'>Implementation Time</h3>
                    <p className='text-slate-600 text-sm'>{selectedPractice.details.implementationTime}</p>
                  </div>
                  <div>
                    <h3 className='font-semibold text-slate-900 mb-2'>Compliance Rate</h3>
                    <p className='text-slate-600 text-sm'>{selectedPractice.details.complianceRate}</p>
                  </div>
                </div>
              </div>
              
              <div className='mt-6 flex justify-end'>
                <button 
                  onClick={handleCloseDetails}
                  className='px-4 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sales Resources Section */}
      <div className='bg-white rounded-2xl shadow p-6'>
        <h2 className='text-lg font-semibold text-slate-900 mb-4'>Sales Resources & Materials</h2>
        <p className='text-slate-600 mb-4'>Share these resources with healthcare providers to support your conversations</p>
        
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {/* Clinical Guidelines */}
          <div className='border rounded-xl p-4 hover:shadow-md transition-shadow'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='p-2 bg-blue-100 rounded-lg'>
                <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-slate-900'>Clinical Guidelines</h3>
                <p className='text-xs text-slate-500'>Evidence-based protocols</p>
              </div>
            </div>
            <div className='space-y-2'>
              <a href='https://www.cdc.gov/infection-control/hcp/cauti/index.html' target='_blank' rel='noopener noreferrer' className='block text-sm text-brand-primary hover:underline'>CAUTI Prevention Guidelines (CDC)</a>
              <a href='https://www.urotoday.com/urinary-catheters-home/intermittent-catheters/description/ic-best-practices-for-management.html' target='_blank' rel='noopener noreferrer' className='block text-sm text-brand-primary hover:underline'>Intermittent Catheterization Best Practices</a>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Urological Care Quality Standards</a>
            </div>
          </div>

          {/* Patient Education */}
          <div className='border rounded-xl p-4 hover:shadow-md transition-shadow'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-slate-900'>Patient Materials</h3>
                <p className='text-xs text-slate-500'>Educational resources</p>
              </div>
            </div>
            <div className='space-y-2'>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Catheter Care Brochures</a>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Patient Education Videos</a>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Self-Care Instructions</a>
            </div>
          </div>

          {/* Research & Data */}
          <div className='border rounded-xl p-4 hover:shadow-md transition-shadow'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='p-2 bg-purple-100 rounded-lg'>
                <svg className='w-5 h-5 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-slate-900'>Research & Data</h3>
                <p className='text-xs text-slate-500'>Clinical studies & outcomes</p>
              </div>
            </div>
            <div className='space-y-2'>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>CAUTI Reduction Studies</a>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Patient Satisfaction Data</a>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Cost-Benefit Analysis</a>
            </div>
          </div>

          {/* Implementation Tools */}
          <div className='border rounded-xl p-4 hover:shadow-md transition-shadow'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='p-2 bg-orange-100 rounded-lg'>
                <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-slate-900'>Implementation Tools</h3>
                <p className='text-xs text-slate-500'>Ready-to-use templates</p>
              </div>
            </div>
            <div className='space-y-2'>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Protocol Implementation Checklist</a>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Staff Training Materials</a>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Quality Metrics Templates</a>
            </div>
          </div>

          {/* Case Studies */}
          <div className='border rounded-xl p-4 hover:shadow-md transition-shadow'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='p-2 bg-red-100 rounded-lg'>
                <svg className='w-5 h-5 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-slate-900'>Case Studies</h3>
                <p className='text-xs text-slate-500'>Real-world success stories</p>
              </div>
            </div>
            <div className='space-y-2'>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Large Hospital CAUTI Reduction</a>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Rural Clinic Implementation</a>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Academic Medical Center Results</a>
            </div>
          </div>

          {/* Contact & Support */}
          <div className='border rounded-xl p-4 hover:shadow-md transition-shadow'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='p-2 bg-teal-100 rounded-lg'>
                <svg className='w-5 h-5 text-teal-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-slate-900'>Contact & Support</h3>
                <p className='text-xs text-slate-500'>Get help & answers</p>
              </div>
            </div>
            <div className='space-y-2'>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Clinical Support Hotline</a>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Implementation Consultation</a>
              <a href='#' className='block text-sm text-brand-primary hover:underline'>Request Product Samples</a>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow p-6'>
        <h2 className='text-lg font-semibold text-slate-900 mb-4'>Recent Updates</h2>
        <div className='space-y-3'>
          <div className='flex items-center gap-3 p-3 bg-slate-50 rounded-lg'>
            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
            <div className='flex-1'>
              <div className='text-sm font-medium'>CAUTI Prevention Bundle updated</div>
              <div className='text-xs text-slate-500'>New evidence-based recommendations added</div>
            </div>
            <div className='text-xs text-slate-500'>2 days ago</div>
          </div>
          
          <div className='flex items-center gap-3 p-3 bg-slate-50 rounded-lg'>
            <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
            <div className='flex-1'>
              <div className='text-sm font-medium'>Quality Metrics Dashboard launched</div>
              <div className='text-xs text-slate-500'>New KPIs for tracking patient outcomes</div>
            </div>
            <div className='text-xs text-slate-500'>1 week ago</div>
          </div>
          
          <div className='flex items-center gap-3 p-3 bg-slate-50 rounded-lg'>
            <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
            <div className='flex-1'>
              <div className='text-sm font-medium'>Patient Education Framework in review</div>
              <div className='text-xs text-slate-500'>Awaiting final approval from clinical team</div>
            </div>
            <div className='text-xs text-slate-500'>2 weeks ago</div>
          </div>
        </div>
      </div>
    </div>
  )
}
