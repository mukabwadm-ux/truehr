type Nullable<T> = T | null;

type Table<Row, Insert, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      admins: Table<
        { id: string; email: string; created_at: string },
        { id?: string; email: string; created_at?: string }
      >;
      health_check_requests: Table<
        {
          id: string;
          full_name: string;
          company: string;
          email: string;
          phone: string;
          employee_band: "1-10" | "11-50" | "51-150" | "150+";
          need: "payroll" | "hr_consulting" | "both" | "not_sure";
          message: Nullable<string>;
          consent_contact: boolean;
          status: "new" | "contacted" | "booked" | "won" | "lost";
          source_page: string;
          notes: Nullable<string>;
          created_at: string;
        },
        {
          id?: string;
          full_name: string;
          company: string;
          email: string;
          phone: string;
          employee_band: "1-10" | "11-50" | "51-150" | "150+";
          need: "payroll" | "hr_consulting" | "both" | "not_sure";
          message?: Nullable<string>;
          consent_contact: boolean;
          status?: "new" | "contacted" | "booked" | "won" | "lost";
          source_page?: string;
          notes?: Nullable<string>;
          created_at?: string;
        }
      >;
      briefings: Table<
        {
          id: string;
          slug: string;
          title: string;
          summary: string;
          format: "online" | "in_person";
          topic: string;
          starts_at: string;
          ends_at: string;
          venue: Nullable<string>;
          speaker_name: string;
          speaker_role: string;
          speaker_photo_url: Nullable<string>;
          agenda: string[];
          capacity: Nullable<number>;
          image_url: Nullable<string>;
          published: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          slug: string;
          title: string;
          summary: string;
          format: "online" | "in_person";
          topic: string;
          starts_at: string;
          ends_at: string;
          venue?: Nullable<string>;
          speaker_name: string;
          speaker_role: string;
          speaker_photo_url?: Nullable<string>;
          agenda?: string[];
          capacity?: Nullable<number>;
          image_url?: Nullable<string>;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      briefing_registrations: Table<
        {
          id: string;
          briefing_id: string;
          full_name: string;
          company: string;
          role: string;
          email: string;
          phone: string;
          consent_contact: boolean;
          attended: boolean;
          created_at: string;
        },
        {
          id?: string;
          briefing_id: string;
          full_name: string;
          company: string;
          role: string;
          email: string;
          phone: string;
          consent_contact: boolean;
          attended?: boolean;
          created_at?: string;
        }
      >;
      newsletter_subscribers: Table<
        {
          id: string;
          email: string;
          consent: boolean;
          consent_text: string;
          consented_at: string;
          unsubscribed_at: Nullable<string>;
          unsubscribe_token: string;
          created_at: string;
        },
        {
          id?: string;
          email: string;
          consent: boolean;
          consent_text: string;
          consented_at?: string;
          unsubscribed_at?: Nullable<string>;
          unsubscribe_token: string;
          created_at?: string;
        }
      >;
      posts: Table<
        {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          body_md: string;
          category:
            "Payroll" | "Employment law" | "Data protection" | "HR practice";
          author_name: string;
          cover_url: Nullable<string>;
          published_at: Nullable<string>;
          published: boolean;
          seo_title: Nullable<string>;
          seo_description: Nullable<string>;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          body_md: string;
          category:
            "Payroll" | "Employment law" | "Data protection" | "HR practice";
          author_name: string;
          cover_url?: Nullable<string>;
          published_at?: Nullable<string>;
          published?: boolean;
          seo_title?: Nullable<string>;
          seo_description?: Nullable<string>;
          created_at?: string;
          updated_at?: string;
        }
      >;
      team_members: Table<
        {
          id: string;
          name: string;
          role: string;
          phone: string;
          photo_url: Nullable<string>;
          bio: Nullable<string>;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          name: string;
          role: string;
          phone: string;
          photo_url?: Nullable<string>;
          bio?: Nullable<string>;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      testimonials: Table<
        {
          id: string;
          quote: string;
          client_name: string;
          client_role: string;
          company: string;
          photo_url: Nullable<string>;
          consent_confirmed: boolean;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          quote: string;
          client_name: string;
          client_role: string;
          company: string;
          photo_url?: Nullable<string>;
          consent_confirmed?: boolean;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      client_logos: Table<
        {
          id: string;
          company: string;
          logo_url: string;
          website_url: Nullable<string>;
          consent_confirmed: boolean;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          company: string;
          logo_url: string;
          website_url?: Nullable<string>;
          consent_confirmed?: boolean;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      submission_rate_limits: Table<
        {
          ip_hash: string;
          window_started_at: string;
          submission_count: number;
        },
        {
          ip_hash: string;
          window_started_at?: string;
          submission_count?: number;
        }
      >;
    };
    Views: Record<string, never>;
    Functions: {
      consume_submission_rate_limit: {
        Args: { p_ip_hash: string };
        Returns: boolean;
      };
      register_briefing: {
        Args: {
          p_briefing_id: string;
          p_full_name: string;
          p_company: string;
          p_role: string;
          p_email: string;
          p_phone: string;
          p_consent_contact: boolean;
        };
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
