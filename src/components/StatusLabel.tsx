export function StatusLabel({ status }: { status: string }) {
  const live = /^(ongoing|planning)$/i.test(status.trim())
  return <span className={live ? 'status status--live' : 'status'}>{status}</span>
}
