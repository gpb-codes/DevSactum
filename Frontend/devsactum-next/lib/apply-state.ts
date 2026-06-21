let selectedJobId: string | null = null

export function setApplyJobId(id: string) {
  selectedJobId = id
}

export function getApplyJobId(): string | null {
  const id = selectedJobId
  selectedJobId = null
  return id
}
