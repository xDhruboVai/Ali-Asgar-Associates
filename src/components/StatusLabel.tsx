export function StatusLabel({ status }: { status: string }) {
  const modifier = status === 'Completed' ? 'completed' : status === 'Ongoing' ? 'ongoing' : 'other'
  return <span className={`status status--${modifier}`}>{status}</span>
}
