package sample.ui.model;

import javax.persistence.*;
import java.security.Timestamp;
import java.util.Date;

@Entity
@Table(name = "map_mark")
public class MapMark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id;

    @Column
    private String message;

    @Column
    private double longitude;

    @Column
    private double latitude;

    @Column
    private String country;

    private Date date;


    public MapMark(String message, double longitude, double latitude, String country) {
        this.message = message;
        this.country = country;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public MapMark(){

    }

    @PrePersist
    protected void onCreate() {
        date = new Date();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
