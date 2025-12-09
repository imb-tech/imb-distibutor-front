type Props = {}

const RouteOrderMain = (props: Props) => {
    return (
        <div className="h-full w-full ">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.5447303519404!2d55.14154497561043!3d25.091020685992707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b4e6ecbeb0d%3A0x92b03d956df75dbe!2sMarsa%20Dubai%20-%20Dubai%20International%20Marine%20Club%20-%20Dubai%20-%20United%20Arab%20Emirates!5e1!3m2!1sen!2s!4v1765258066916!5m2!1sen!2s"
                width="100%"
                height="700"
                style={{ border: 0 }}
                className="rounded-lg"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    )
}

export default RouteOrderMain
