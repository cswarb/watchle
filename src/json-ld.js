import React from "react";
import { Helmet } from "react-helmet";

const JsonLd = ({ schema }) => (
    <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
);

export default JsonLd;  