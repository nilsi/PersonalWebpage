package sample.ui;

import com.github.greengerong.PreRenderSEOFilter;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.FilterConfig;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class WebConfig {

    @Bean
    public FilterRegistrationBean shallowEtagHeaderFilter() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(new PreRenderSEOFilter());

        Map<String, String> params = new HashMap<String, String>();
        params.put("prerender", "key-from-prerender.io-here");
        registration.setInitParameters(params);

        registration.addUrlPatterns("/*");
        return registration;
    }

}
