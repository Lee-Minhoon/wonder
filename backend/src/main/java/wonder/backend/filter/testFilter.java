package wonder.backend.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

//@Configuration
public class testFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest)request;
        HttpServletResponse res = (HttpServletResponse)response;

        String headerAuth = req.getHeader("Authorization");
        System.out.println("Filter Test================");
        System.out.println(req);
        System.out.println(res);
        System.out.println(headerAuth);
        System.out.println("===========================");

//        if(headerAuth.equals("hell")) {
//            chain.doFilter(req, res);
//        } else {
//            PrintWriter out = res.getWriter();
//            out.println("no");
//        }

        chain.doFilter(req, res);
    }

//    @Bean
//    public FilterRegistrationBean<testFilter> filter() {
//        FilterRegistrationBean<testFilter> bean = new FilterRegistrationBean<>(new testFilter());
//        bean.addUrlPatterns("/*");
//        bean.setOrder(0);
//        return bean;
//    }
}
