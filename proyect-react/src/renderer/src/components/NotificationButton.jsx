export default function NotificationButton({ moveSelectedTasks }) {
    return (
        <div>
            <button onClick={() => moveSelectedTasks("In Progress")}>Move to In Progress</button>
            <button onClick={() => moveSelectedTasks("Completed")}>Move to Completed</button>
            <button onClick={() => moveSelectedTasks("Canceled")}>Move to Canceled</button>
        </div>
    );
}
