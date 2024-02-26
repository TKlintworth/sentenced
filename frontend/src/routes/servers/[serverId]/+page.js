export const load = ({ fetch, params }) => {
    console.log("params: ", params);
    return {
        props: {
            serverId: params.serverId
        }
    };
};