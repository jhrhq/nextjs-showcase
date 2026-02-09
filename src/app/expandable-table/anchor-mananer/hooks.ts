// src/hooks/linker/use-projects.ts (add anchor hook)

/* export function useAnchorManager(projectId: string) {
  return useQuery({
    queryKey: ["linker-anchor-manager", projectId],
    queryFn: () => projectsApi.getAnchorManager(projectId),
    enabled: !!projectId,
  });
} */

// src/lib/linker/api/projects.ts (add anchor API)

/* export const projectsApi = {
  // ... existing methods
  getAnchorManager: async (projectId: string): Promise<AnchorManagerData> => {
    const response = await linkerApi.get(`/projects/${projectId}/anchor-manager`);
    return response.data;
  },
}; */

