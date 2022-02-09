package wonder.backend.controller;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wonder.backend.constants.ExceptionEnum;
import wonder.backend.constants.ResponseCode;
import wonder.backend.constants.ResponseMessage;
import wonder.backend.dto.common.Response;
import wonder.backend.exception.CustomException;
import wonder.backend.jwt.TokenProvider;
import wonder.backend.service.CategoryService;
import wonder.backend.service.PostService;
import wonder.backend.service.UserService;

import java.util.Optional;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("test")
@AllArgsConstructor
public class TestController {
    private final Logger logger = LoggerFactory.getLogger(TestController.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";

    private final UserService userService;
    private final PostService postService;
    private final CategoryService categoryService;

    @Autowired
    private TokenProvider tokenProvider;

    public static final String COLLECTION_NAME = "users";

    @GetMapping("firebase")
    public ResponseEntity firebase() throws ExecutionException, InterruptedException {

        Firestore db = FirestoreClient.getFirestore();
        System.out.println(db);
//        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
//        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
//        for(QueryDocumentSnapshot d : documents) {
//            System.out.println(d);
//        }

        return ResponseEntity.ok()
                .body(Response.builder()
                        .code(ResponseCode.SUCCESS)
                        .message(ResponseMessage.SUCCESS)
                        .build());
    }


    public <T> T getOrElseThrow(Optional<T> param) {
        return param.orElseThrow(() -> new CustomException(ExceptionEnum.NOT_FOUND));
    }
}
