package wonder.backend.service;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class FirebaseService {
    private final Logger logger = LoggerFactory.getLogger(FirebaseService.class);

    @Value("${app.firebase.bucket}")
    private String firebaseBucket;

    public String uploadFiles(MultipartFile file, String filename) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        InputStream content = new ByteArrayInputStream(file.getBytes());
        Blob blob = bucket.create(filename.toString(), content, file.getContentType());
        return blob.getMediaLink();
    }
}