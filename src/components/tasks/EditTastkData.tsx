import { getTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export default function EditTastkData() {
  const params = useParams();
  const projectId = params.projectId!
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!;

  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ taskId, projectId }),
    enabled: !!taskId
  });

  if (isError) return <Navigate to="/404" />
  if(data) return <EditTaskModal data={data} taskId={taskId}/>;
}
