-- =====================================================
-- AppointPro - Complete Appointment System Database
-- MySQL Database Schema
-- =====================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS appointment_system;
CREATE DATABASE appointment_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE appointment_system;

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Users table with role-based access
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin', 'manager', 'user') DEFAULT 'user',
    status ENUM('active', 'inactive', 'suspended', 'pending') DEFAULT 'pending',
    email_verified_at TIMESTAMP NULL,
    phone_verified_at TIMESTAMP NULL,
    last_login_at TIMESTAMP NULL,
    profile_image VARCHAR(500),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status),
    INDEX idx_uuid (uuid)
);

-- User addresses for multiple locations
CREATE TABLE user_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL DEFAULT 'Home',
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'United States',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_default (is_default),
    INDEX idx_location (latitude, longitude)
);

-- Service categories
CREATE TABLE service_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    image VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_active (is_active),
    INDEX idx_sort (sort_order)
);

-- Service subcategories
CREATE TABLE service_subcategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    image VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES service_categories(id) ON DELETE CASCADE,
    INDEX idx_category_id (category_id),
    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
);

-- Services
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    subcategory_id INT,
    name VARCHAR(300) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    short_description TEXT,
    full_description LONGTEXT,
    base_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    min_price DECIMAL(10, 2),
    max_price DECIMAL(10, 2),
    duration_minutes INT NOT NULL DEFAULT 60,
    buffer_time_minutes INT DEFAULT 15,
    is_active BOOLEAN DEFAULT TRUE,
    requires_approval BOOLEAN DEFAULT FALSE,
    max_advance_booking_days INT DEFAULT 30,
    min_advance_booking_hours INT DEFAULT 2,
    images JSON,
    features JSON,
    requirements JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES service_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (subcategory_id) REFERENCES service_subcategories(id) ON DELETE SET NULL,
    INDEX idx_category_id (category_id),
    INDEX idx_subcategory_id (subcategory_id),
    INDEX idx_slug (slug),
    INDEX idx_active (is_active),
    INDEX idx_price (base_price)
);

-- Service areas and zones
CREATE TABLE service_areas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    postal_codes JSON,
    coordinates JSON,
    is_active BOOLEAN DEFAULT TRUE,
    delivery_fee DECIMAL(8, 2) DEFAULT 0.00,
    min_order_amount DECIMAL(10, 2) DEFAULT 0.00,
    estimated_travel_time_minutes INT DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active),
    INDEX idx_name (name)
);

-- Service pricing by area
CREATE TABLE service_area_pricing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL,
    service_area_id INT NOT NULL,
    price_modifier DECIMAL(5, 2) DEFAULT 1.00,
    additional_fee DECIMAL(8, 2) DEFAULT 0.00,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (service_area_id) REFERENCES service_areas(id) ON DELETE CASCADE,
    UNIQUE KEY unique_service_area (service_id, service_area_id)
);

-- Time slots and availability
CREATE TABLE time_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day_of_week TINYINT NOT NULL, -- 0=Sunday, 1=Monday, etc.
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_duration_minutes INT NOT NULL DEFAULT 60,
    max_appointments_per_slot INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_day_time (day_of_week, start_time),
    INDEX idx_active (is_active)
);

-- Service provider assignments
CREATE TABLE service_providers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    hourly_rate DECIMAL(8, 2),
    commission_rate DECIMAL(5, 2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    certification_details JSON,
    availability_schedule JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_service (user_id, service_id),
    INDEX idx_user_id (user_id),
    INDEX idx_service_id (service_id)
);

-- =====================================================
-- APPOINTMENT SYSTEM
-- =====================================================

-- Appointments
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    customer_id INT NOT NULL,
    service_id INT NOT NULL,
    service_provider_id INT,
    address_id INT NOT NULL,
    
    -- Appointment details
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_minutes INT NOT NULL,
    
    -- Pricing
    service_price DECIMAL(10, 2) NOT NULL,
    additional_fees DECIMAL(10, 2) DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    tax_amount DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    
    -- Status and tracking
    status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'partially_paid', 'refunded', 'failed') DEFAULT 'pending',
    
    -- Additional information
    special_instructions TEXT,
    internal_notes TEXT,
    customer_rating TINYINT CHECK (customer_rating >= 1 AND customer_rating <= 5),
    customer_feedback TEXT,
    provider_notes TEXT,
    
    -- Timestamps
    confirmed_at TIMESTAMP NULL,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    cancelled_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (service_provider_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (address_id) REFERENCES user_addresses(id) ON DELETE CASCADE,
    
    INDEX idx_customer_id (customer_id),
    INDEX idx_service_id (service_id),
    INDEX idx_provider_id (service_provider_id),
    INDEX idx_date (appointment_date),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_uuid (uuid)
);

-- Appointment status history
CREATE TABLE appointment_status_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT NOT NULL,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by INT NOT NULL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_appointment_id (appointment_id)
);

-- =====================================================
-- SUPPORT AND COMMUNICATION
-- =====================================================

-- Support tickets
CREATE TABLE support_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    appointment_id INT,
    assigned_to INT,
    
    subject VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('open', 'in_progress', 'waiting_customer', 'resolved', 'closed') DEFAULT 'open',
    category ENUM('general', 'booking', 'payment', 'service_quality', 'technical', 'complaint') DEFAULT 'general',
    
    resolution_notes TEXT,
    customer_satisfaction TINYINT CHECK (customer_satisfaction >= 1 AND customer_satisfaction <= 5),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    closed_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_ticket_number (ticket_number)
);

-- Support ticket messages
CREATE TABLE support_ticket_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE,
    attachments JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_ticket_id (ticket_id),
    INDEX idx_user_id (user_id)
);

-- =====================================================
-- PAYMENT SYSTEM
-- =====================================================

-- Payment transactions
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT NOT NULL,
    user_id INT NOT NULL,
    
    payment_method ENUM('credit_card', 'debit_card', 'bank_transfer', 'digital_wallet', 'cash') NOT NULL,
    payment_gateway ENUM('ziina', 'stripe', 'paypal', 'manual') NOT NULL,
    gateway_transaction_id VARCHAR(255),
    
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status ENUM('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded') DEFAULT 'pending',
    
    gateway_response JSON,
    failure_reason TEXT,
    
    processed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_appointment_id (appointment_id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_gateway_transaction_id (gateway_transaction_id)
);

-- =====================================================
-- WEBSITE MANAGEMENT
-- =====================================================

-- Website pages
CREATE TABLE website_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(300) UNIQUE NOT NULL,
    content LONGTEXT,
    meta_title VARCHAR(300),
    meta_description TEXT,
    meta_keywords TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    show_in_header BOOLEAN DEFAULT FALSE,
    show_in_footer BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    template VARCHAR(100) DEFAULT 'default',
    created_by INT NOT NULL,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_published (is_published)
);

-- Website settings
CREATE TABLE website_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value LONGTEXT,
    setting_type ENUM('text', 'number', 'boolean', 'json', 'file') DEFAULT 'text',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_key (setting_key),
    INDEX idx_public (is_public)
);

-- =====================================================
-- NOTIFICATIONS AND COMMUNICATIONS
-- =====================================================

-- Notification templates
CREATE TABLE notification_templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    type ENUM('email', 'sms', 'push', 'in_app') NOT NULL,
    event_trigger VARCHAR(100) NOT NULL,
    subject VARCHAR(500),
    content TEXT NOT NULL,
    variables JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_trigger (event_trigger),
    INDEX idx_type (type),
    INDEX idx_active (is_active)
);

-- Sent notifications log
CREATE TABLE notifications_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    template_id INT,
    type ENUM('email', 'sms', 'push', 'in_app') NOT NULL,
    recipient VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    content TEXT,
    status ENUM('pending', 'sent', 'delivered', 'failed', 'bounced') DEFAULT 'pending',
    error_message TEXT,
    external_id VARCHAR(255),
    sent_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (template_id) REFERENCES notification_templates(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_type (type)
);

-- =====================================================
-- SYSTEM CONFIGURATION
-- =====================================================

-- API credentials and configuration
CREATE TABLE api_credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    service_type ENUM('sms', 'email', 'payment', 'whatsapp', 'maps', 'other') NOT NULL,
    credentials JSON NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_production BOOLEAN DEFAULT FALSE,
    created_by INT NOT NULL,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_service_name (service_name),
    INDEX idx_service_type (service_type),
    INDEX idx_active (is_active)
);

-- System logs
CREATE TABLE system_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level ENUM('emergency', 'alert', 'critical', 'error', 'warning', 'notice', 'info', 'debug') NOT NULL,
    message TEXT NOT NULL,
    context JSON,
    user_id INT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_level (level),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- ANALYTICS AND REPORTING
-- =====================================================

-- Website analytics
CREATE TABLE analytics_page_views (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_url VARCHAR(500) NOT NULL,
    user_id INT,
    session_id VARCHAR(100),
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    device_type ENUM('desktop', 'tablet', 'mobile', 'other') DEFAULT 'other',
    browser VARCHAR(100),
    operating_system VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_page_url (page_url),
    INDEX idx_user_id (user_id),
    INDEX idx_session_id (session_id),
    INDEX idx_created_at (created_at)
);

-- Business metrics
CREATE TABLE business_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15, 4) NOT NULL,
    metric_date DATE NOT NULL,
    metric_type ENUM('revenue', 'appointments', 'customers', 'conversion', 'other') NOT NULL,
    additional_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_metric_date (metric_name, metric_date),
    INDEX idx_metric_name (metric_name),
    INDEX idx_metric_date (metric_date),
    INDEX idx_metric_type (metric_type)
);

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert default super admin
INSERT INTO users (first_name, last_name, email, password_hash, role, status, email_verified_at) VALUES
('Super', 'Admin', 'admin@appointpro.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin', 'active', NOW()),
('System', 'Administrator', 'system@appointpro.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'active', NOW()),
('John', 'Manager', 'manager@appointpro.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'manager', 'active', NOW()),
('Jane', 'Customer', 'customer@appointpro.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', 'active', NOW());

-- Insert service categories
INSERT INTO service_categories (name, slug, description, icon) VALUES
('Home Cleaning', 'home-cleaning', 'Professional home cleaning services', 'home'),
('HVAC Services', 'hvac-services', 'Heating, ventilation, and air conditioning', 'wind'),
('Plumbing', 'plumbing', 'Professional plumbing services', 'droplets'),
('Electrical', 'electrical', 'Licensed electrical work', 'zap'),
('Maintenance', 'maintenance', 'General maintenance and repair', 'wrench');

-- Insert services
INSERT INTO services (category_id, name, slug, short_description, base_price, duration_minutes) VALUES
(1, 'Standard House Cleaning', 'standard-house-cleaning', 'Regular cleaning service for your home', 120.00, 120),
(1, 'Deep Cleaning Service', 'deep-cleaning-service', 'Comprehensive deep cleaning', 200.00, 240),
(2, 'AC Maintenance', 'ac-maintenance', 'Regular AC system maintenance', 150.00, 90),
(2, 'Heating System Repair', 'heating-system-repair', 'Professional heating repairs', 180.00, 120),
(3, 'Plumbing Repair', 'plumbing-repair', 'General plumbing repairs', 160.00, 90),
(4, 'Electrical Installation', 'electrical-installation', 'Licensed electrical work', 200.00, 180);

-- Insert service areas
INSERT INTO service_areas (name, description, postal_codes, delivery_fee) VALUES
('Downtown', 'Central business district', '["10001", "10002", "10003"]', 0.00),
('Residential North', 'Northern residential areas', '["10010", "10011", "10012"]', 15.00),
('Business District', 'Commercial and office areas', '["10020", "10021", "10022"]', 10.00);

-- Insert time slots
INSERT INTO time_slots (day_of_week, start_time, end_time, slot_duration_minutes) VALUES
(1, '08:00:00', '17:00:00', 60), -- Monday
(2, '08:00:00', '17:00:00', 60), -- Tuesday
(3, '08:00:00', '17:00:00', 60), -- Wednesday
(4, '08:00:00', '17:00:00', 60), -- Thursday
(5, '08:00:00', '17:00:00', 60), -- Friday
(6, '09:00:00', '15:00:00', 60); -- Saturday

-- Insert website settings
INSERT INTO website_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_name', 'AppointPro', 'text', 'Website name', true),
('site_logo', '/assets/logo.png', 'file', 'Website logo', true),
('primary_color', '#00C3FF', 'text', 'Primary brand color', true),
('contact_email', 'contact@appointpro.com', 'text', 'Main contact email', true),
('contact_phone', '+1 (555) 123-4567', 'text', 'Main contact phone', true),
('address', '123 Business Ave, City, State 12345', 'text', 'Business address', true),
('max_advance_booking_days', '30', 'number', 'Maximum days in advance for booking', false),
('min_advance_booking_hours', '2', 'number', 'Minimum hours in advance for booking', false);

-- Insert notification templates
INSERT INTO notification_templates (name, type, event_trigger, subject, content) VALUES
('Appointment Confirmation', 'email', 'appointment_confirmed', 'Appointment Confirmed', 'Your appointment has been confirmed for {{date}} at {{time}}.'),
('Appointment Reminder', 'sms', 'appointment_reminder', '', 'Reminder: You have an appointment tomorrow at {{time}} for {{service}}.'),
('Payment Confirmation', 'email', 'payment_received', 'Payment Received', 'We have received your payment of {{amount}} for appointment {{appointment_id}}.');

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Additional composite indexes for better query performance
CREATE INDEX idx_appointments_customer_date ON appointments(customer_id, appointment_date);
CREATE INDEX idx_appointments_provider_date ON appointments(service_provider_id, appointment_date);
CREATE INDEX idx_appointments_date_status ON appointments(appointment_date, status);
CREATE INDEX idx_payments_date_status ON payments(created_at, status);
CREATE INDEX idx_support_tickets_user_status ON support_tickets(user_id, status);

-- =====================================================
-- VIEWS FOR REPORTING
-- =====================================================

-- Daily appointment summary
CREATE VIEW daily_appointment_summary AS
SELECT 
    appointment_date,
    COUNT(*) as total_appointments,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_appointments,
    COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_appointments,
    SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) as daily_revenue
FROM appointments 
GROUP BY appointment_date
ORDER BY appointment_date DESC;

-- Monthly revenue report
CREATE VIEW monthly_revenue_report AS
SELECT 
    YEAR(appointment_date) as year,
    MONTH(appointment_date) as month,
    COUNT(*) as total_appointments,
    SUM(total_amount) as total_revenue,
    AVG(total_amount) as average_order_value
FROM appointments 
WHERE status = 'completed'
GROUP BY YEAR(appointment_date), MONTH(appointment_date)
ORDER BY year DESC, month DESC;

-- User statistics
CREATE VIEW user_statistics AS
SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    u.role,
    COUNT(a.id) as total_appointments,
    SUM(CASE WHEN a.status = 'completed' THEN a.total_amount ELSE 0 END) as total_spent,
    MAX(a.appointment_date) as last_appointment_date
FROM users u
LEFT JOIN appointments a ON u.id = a.customer_id
WHERE u.role = 'user'
GROUP BY u.id, u.first_name, u.last_name, u.email, u.role;

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

DELIMITER //

-- Get available time slots for a specific date and service
CREATE PROCEDURE GetAvailableTimeSlots(
    IN service_date DATE,
    IN service_id_param INT
)
BEGIN
    DECLARE service_duration INT;
    
    -- Get service duration
    SELECT duration_minutes INTO service_duration 
    FROM services 
    WHERE id = service_id_param;
    
    -- Return available slots
    SELECT 
        ts.start_time,
        ts.end_time,
        ts.slot_duration_minutes,
        (ts.max_appointments_per_slot - COALESCE(booked.appointment_count, 0)) as available_spots
    FROM time_slots ts
    LEFT JOIN (
        SELECT 
            TIME(start_time) as slot_time,
            COUNT(*) as appointment_count
        FROM appointments 
        WHERE appointment_date = service_date 
        AND status NOT IN ('cancelled', 'no_show')
        GROUP BY TIME(start_time)
    ) booked ON ts.start_time = booked.slot_time
    WHERE ts.day_of_week = DAYOFWEEK(service_date) - 1
    AND ts.is_active = TRUE
    AND (ts.max_appointments_per_slot - COALESCE(booked.appointment_count, 0)) > 0
    ORDER BY ts.start_time;
END //

-- Calculate total revenue for a date range
CREATE PROCEDURE GetRevenueReport(
    IN start_date DATE,
    IN end_date DATE
)
BEGIN
    SELECT 
        DATE(appointment_date) as date,
        COUNT(*) as total_appointments,
        SUM(total_amount) as daily_revenue,
        AVG(total_amount) as average_order_value
    FROM appointments 
    WHERE appointment_date BETWEEN start_date AND end_date
    AND status = 'completed'
    GROUP BY DATE(appointment_date)
    ORDER BY date;
END //

DELIMITER ;

-- =====================================================
-- TRIGGERS
-- =====================================================

DELIMITER //

-- Trigger to update appointment status history
CREATE TRIGGER appointment_status_change 
AFTER UPDATE ON appointments
FOR EACH ROW
BEGIN
    IF OLD.status != NEW.status THEN
        INSERT INTO appointment_status_history (
            appointment_id, 
            old_status, 
            new_status, 
            changed_by, 
            reason
        ) VALUES (
            NEW.id, 
            OLD.status, 
            NEW.status, 
            @current_user_id, 
            'Status updated via system'
        );
    END IF;
END //

-- Trigger to set appointment end time based on service duration
CREATE TRIGGER set_appointment_end_time 
BEFORE INSERT ON appointments
FOR EACH ROW
BEGIN
    DECLARE service_duration INT;
    
    SELECT duration_minutes INTO service_duration 
    FROM services 
    WHERE id = NEW.service_id;
    
    SET NEW.end_time = ADDTIME(NEW.start_time, SEC_TO_TIME(service_duration * 60));
    SET NEW.duration_minutes = service_duration;
END //

DELIMITER ;

-- =====================================================
-- FINAL NOTES
-- =====================================================

/*
This database schema provides:

1. Complete user management with role-based access
2. Comprehensive appointment system
3. Service catalog with categories and pricing
4. Payment processing integration
5. Support ticket system
6. Website content management
7. Notification system
8. Analytics and reporting capabilities
9. System configuration and API management
10. Performance optimized with proper indexes

To use this schema:
1. Run this script on a MySQL 8.0+ server
2. Update the password hashes with proper encryption
3. Configure the application to connect to this database
4. Set up proper user permissions and access controls
5. Implement data backup and recovery procedures

Default login credentials (update these immediately):
- Super Admin: admin@appointpro.com / password
- Admin: system@appointpro.com / password  
- Manager: manager@appointpro.com / password
- User: customer@appointpro.com / password
*/