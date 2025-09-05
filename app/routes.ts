import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/auth', 'routes/auth.tsx'),
    route('/upload', 'routes/upload.tsx'),
    route('/resume/:id', 'routes/resume.tsx'),
    route('/features', 'routes/features.tsx'),
    route('/about', 'routes/about.tsx'),
    route('/help', 'routes/help.tsx'),
    route('/contact', 'routes/contact.tsx'),
    route('/privacy', 'routes/privacy.tsx'),
    route('/terms', 'routes/terms.tsx'),
    route('/wipe', 'routes/wipe.tsx'),
] satisfies RouteConfig;
