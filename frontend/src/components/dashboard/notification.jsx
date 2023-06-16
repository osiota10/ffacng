import NotificationCard from "./components/notificationCard";

const Notifications = () => {
    return (
        <section className="mt-3">
            <h1 className="text-center mb-2">Notifications</h1>
            <NotificationCard popover={false} />
        </section>
    );
}

export default Notifications;