import { useParams } from 'react-router-dom'
import { certificates } from '@/data/certificates-data'

export function VerifyCertificate() {
  const { certificateId } = useParams<{ certificateId: string }>()
  const cert = certificateId ? certificates[certificateId] : undefined
  const isValid = cert && cert.status === 'verified'

  if (!isValid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 text-center">
        <div className="text-5xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-white">Certificate Not Found</h1>
        <p className="text-white/50 mt-2">
          The certificate ID <span className="font-mono">{certificateId}</span> could not be verified.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-lg w-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xl font-semibold text-white">
            un<span className="text-indigo-400">matrix</span>
          </span>
          <span className="flex items-center gap-1 text-green-400 font-medium text-sm bg-green-400/10 px-3 py-1 rounded-full">
            ✅ Verified
          </span>
        </div>

        <p className="text-white/50 text-sm mb-1">Certificate ID</p>
        <p className="font-mono text-white mb-6">{certificateId}</p>

        <div className="space-y-3 text-sm">
          <Row label="Name" value={cert.student_name} />
          <Row label="Internship" value={cert.role} />
          <Row label="Duration" value={`${cert.start_date} – ${cert.end_date}`} />
          <Row label="Issued on" value={cert.issued_date} />
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 text-xs text-white/40 text-center">
          Issued by Unmatrix · Aviraj Patil, Founder &amp; CEO · founder@unmatrix.in
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-2">
      <span className="text-white/50">{label}</span>
      <span className="font-medium text-white text-right">{value}</span>
    </div>
  )
}